import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Reference to User
    transactionId: { type: String, required: true, unique: true }, // Safaricom transaction ID or unique ID
    transactionType: { type: String, required: true, enum: ["B2C", "C2B"] }, // Transaction type
    amount: { type: Number, required: true }, // Amount involved in the transaction
    account: { type: String, required: true }, // Account paid to or from
    status: { type: String, required: true, default: "Pending" }, // Status (e.g., Pending, Completed)
    remarks: { type: String }, // Additional remarks
    timestamp: { type: Date, default: Date.now }, // Transaction time
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
