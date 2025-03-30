import express from 'express';

import {
    createToken,
    stkPush,
    b2cPayment,
    simulator
} from '../controllers/MpesaToken.js';

import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();
// Route to get token and trigger STK Push
router.post('/stkpush', verifyJWT, createToken, stkPush);

// Route to handle Validation callback from M-Pesa
router.post('/simulate', verifyJWT, createToken, simulator);

//route for b2c payment
router.post('/b2c', verifyJWT, createToken, b2cPayment);


export default router;
