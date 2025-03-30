import express from 'express';

import {
    registerURLs,
    createToken,
    stkPush,
    validationCallback,
    confirmationCallback,
    // mpesaCallback,

    b2cPayment,
    simulator
} from '../controllers/MpesaToken.js';
const router = express.Router();

// // Route to register the URLs (validation and confirmation URLs)
// router.post('/registerurls', createToken, registerURLs);

// Route to get token and trigger STK Push
router.post('/stkpush', createToken, registerURLs, stkPush);

// Route to handle Validation callback from M-Pesa
router.post('/validation', validationCallback);

// Route to handle Confirmation callback from M-Pesa
router.post('/confirmation', confirmationCallback);

// Route to handle mpesa callback response
// router.post('/stk_callback', mpesaCallback);

// Route to handle Validation callback from M-Pesa
router.post('/simulate', createToken, registerURLs, simulator);

//route for b2c payment
router.post('/b2c', createToken, b2cPayment);


export default router;
