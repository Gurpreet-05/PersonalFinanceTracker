import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from '../Controllers/transactionController.js';
const router = express.Router();

router.route('/')
    .get(protect,getTransactions)
    .post(protect,addTransaction);

router.route('/:id')
    .put(protect,updateTransaction)
    .delete(protect,deleteTransaction);


export default router;