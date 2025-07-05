import express from "express"
import { createTransactions, deleteTransaction, getTransactionById, getTransactionSummary } from "../controllers/transactionsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

// Apply protect middleware
router.get("/:user_id", protect, getTransactionById);
router.post("/", protect, createTransactions);
router.delete("/:id", protect, deleteTransaction);
router.get("/summary/:user_id", protect, getTransactionSummary);


export default router