import axios from 'axios';
import Transaction from '../models/Transaction.js';

/**
 * Generate an OAuth token for Safaricom API
 */
export const createToken = async (req, res, next) => {
    try {
        const consumerKey = process.env.CONSUMER_KEY;
        const consumerSecret = process.env.CONSUMER_SECRET;

        if (!consumerKey || !consumerSecret) {
            throw new Error('Consumer Key or Secret is missing from environment variables');
        }

        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            { headers: { Authorization: `Basic ${auth}` } }
        );

        req.token = response.data.access_token;
        console.log('Token generated successfully:', req.token);
        next();
    } catch (err) {
        console.error('Error generating token:', err.message);
        return res.status(400).json({
            message: 'Failed to generate token',
            details: err.response ? err.response.data : err.message,
        });
    }
};

/**
 * Register C2B URLs with Safaricom API
 */
export const registerURLs = async (req, res, next) => {
    const token = req.token;
    const url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl';

    const data = {
        ShortCode: '601426',
        ResponseType: 'Completed',
        ConfirmationURL: 'https://65a0-102-212-11-46.ngrok-free.app/api/confirmation',
        ValidationURL: 'https://65a0-102-212-11-46.ngrok-free.app/api/validation',
        Correlator: `${Date.now()}`, // Add a unique correlator to prevent duplicates
    };

    try {
        console.log('Registering URLs with token:', token);

        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('URLs registered successfully:', response.data);
        next();
    } catch (error) {
        console.error('Error registering URLs:', error.message);
        console.error('Error details:', error.response ? error.response.data : error);

        // Log full error details for debugging with Safaricom web tool
        if (error.response) {
            console.error('Safaricom API Error Response:', JSON.stringify(error.response.data, null, 2));
        }

        return res.status(400).json({
            error: 'Failed to register URLs',
            details: error.response ? error.response.data : error.message,
        });
    }
};

/**
 * Initiate STK Push for C2B payments
 */
export const stkPush = async (req, res) => {
    const shortCode = process.env.STK_SHORTCODE;
    const phoneNumber = req.body.phoneNumber?.substring(1); // Remove leading '0'
    const amount = req.body.amount;

    if (!phoneNumber || !amount) {
        return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    const passkey = process.env.PASSKEY;
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const date = new Date();
    const timestamp = formatDate(date);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: `254${phoneNumber}`,
        PartyB: shortCode,
        PhoneNumber: `254${phoneNumber}`,
        CallBackURL: 'https://65a0-102-212-11-46.ngrok-free.app/api/confirmation',
        AccountReference: 'My App Testing',
        TransactionDesc: 'Testing STK push',
    };

    try {
        const response = await axios.post(url, data, {
            headers: { Authorization: `Bearer ${req.token}` },
        });

        const transaction = new Transaction({
            userId: req.user?._id, // Assuming user is authenticated and attached to req
            transactionId: response.data.CheckoutRequestID,
            transactionType: 'C2B',
            amount,
            account: `254${phoneNumber}`,
            status: 'Pending',
            remarks: 'Initiated C2B Payment',
        });

        await transaction.save();
        return res.status(200).json(response.data);
    } catch (err) {
        console.error('STK Push Error:', err.message);
        console.error('Error details:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);

        return res.status(400).json({ error: err.message });
    }
};

/**
 * Handle validation callback from Safaricom
 */
export const validationCallback = (req, res) => {
    console.log('Validation Request Received:', req.body);

    const { TransAmount, BusinessShortCode } = req.body;

    if (TransAmount > 0 && BusinessShortCode === process.env.STK_SHORTCODE) {
        return res.status(200).json({
            ResponseCode: '0',
            ResponseDescription: 'Success',
        });
    }

    return res.status(400).json({
        ResponseCode: '1',
        ResponseDescription: 'Invalid Transaction',
    });
};

/**
 * Handle confirmation callback from Safaricom
 */
export const confirmationCallback = async (req, res) => {
    console.log('Confirmation Request Received:', req.body);

    const { CheckoutRequestID, ResultCode, ResultDesc, TransAmount, PhoneNumber } = req.body;

    try {
        const transaction = await Transaction.findOneAndUpdate(
            { transactionId: CheckoutRequestID },
            {
                status: ResultCode === 0 ? 'Completed' : 'Failed',
                amount: TransAmount,
                account: PhoneNumber,
                remarks: ResultDesc || 'No remarks provided',
            },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        console.log('Transaction confirmed:', transaction);

        return res.status(200).json({
            ResponseCode: '0',
            ResponseDescription: 'Success',
        });
    } catch (error) {
        console.error('Error updating transaction:', error);
        return res.status(500).json({ message: 'Error updating transaction', error });
    }
};

/**
 * Simulate a C2B transaction
 */
export const simulator = async (req, res) => {
    const token = req.token;
    const url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate';

    const data = {
        ShortCode: process.env.STK_SHORTCODE,
        CommandID: 'CustomerPayBillOnline',
        Amount: '100',
        Msisdn: '254708374149', // Test phone number
        BillRefNumber: 'TestAPI',
    };

    try {
        const response = await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Simulation response:', response.data);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error during simulation:', error.response ? error.response.data : error.message);
        return res.status(400).json({ error: error.response ? error.response.data : error.message });
    }
};

/**
 * Handle B2C payment requests
 */
export const b2cPayment = async (req, res) => {
    const url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest';

    const phoneNumber = req.body.phoneNumber?.substring(1); // Remove leading '0'
    const amount = req.body.amount;

    if (!phoneNumber || !amount) {
        return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    const data = {
        OriginatorConversationID: `B2C-${Date.now()}`, // Unique identifier
        InitiatorName: 'testapi',
        SecurityCredential: process.env.SECURITY_CREDENTIALS,
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: process.env.B2C_SHORTCODE,
        PartyB: `254${phoneNumber}`,
        Remarks: 'Here are my remarks',
        QueueTimeOutURL: 'https://65a0-102-212-11-46.ngrok-free.app/api/b2c/queue',
        ResultURL: 'https://65a0-102-212-11-46.ngrok-free.app/api/b2c/result',
        Occasion: 'Christmas',
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                'Content-Type': 'application/json',
            },
        });

        const transaction = new Transaction({
            userId: req.user?._id, // Assuming user is authenticated and attached to req
            transactionId: response.data.OriginatorConversationID,
            transactionType: 'B2C',
            amount,
            account: `254${phoneNumber}`,
            status: 'Pending',
            remarks: 'Initiated B2C Payment',
        });

        await transaction.save();
        return res.status(200).json(response.data);
    } catch (err) {
        console.error('B2C Payment Error:', err.response ? err.response.data : err.message);
        return res.status(400).json({ error: err.response ? err.response.data : err.message });
    }
};

/**
 * Helper function to format date for Safaricom API
 */
const formatDate = (date) => {
    return (
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2)
    );
};