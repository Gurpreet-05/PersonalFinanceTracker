import { transactionModel } from "../db.js";
import z from 'zod';


const addTransactionSchema = z.object({
    description: z.string().min(1,"Description is required"),
    amount: z.number().positive("Amount must be a positive number"),
    type: z.enum(['income', 'expense']),
    category:z.enum(['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Salary', 'Investment', 'Other']),
    date: z.coerce.date().optional() // coerce forces string to become date
    });

const editTransactionSchema = addTransactionSchema.partial(); // all fields become optional

export async function addTransaction(req,res){
    try {
        const parsedData=addTransactionSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({
                message:"Input Validation Error",
                errors:z.treeifyError(parsedData.error)
            })
        }
        const {description,amount,type,category,date}=parsedData.data;
        const newTransaction= await transactionModel.create({
            userId:req.user.id,
            description,
            amount,
            type,
            category,
            date:date || undefined
        });
        return res.status(201).json(newTransaction);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
}

export async function getTransactions(req,res){
    try {
        const {frequency} = req.query;
        const query = {userId:req.user.id};
        if(frequency!=='all'){
            const now=new Date();
            const last=new Date();

            if(frequency==='week'){
                last.setDate(now.getDate()-now.getDay());
                query.date={$gte:last};
            }
            else if(frequency==='month'){
                const monthStart=new Date(now.getFullYear(),now.getMonth(),1);
                query.date={$gte:monthStart};
            }
        }
        const transactions=await transactionModel.find(query).sort({date:-1});
        return res.status(200).json(transactions);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
}


export async function updateTransaction(req, res){
    try {
        const {id}=req.params;
        const parsedData=editTransactionSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({
                message:"Input Validation Error",
                errors:z.treeifyError(parsedData.error)
            })
        }
        const transaction=await transactionModel.findById(id);
        if(!transaction) return res.status(404).json({message:"Transaction does not exist"});
        if(transaction.userId.toString()===req.user.id){
            const updatedTransaction=await transactionModel.findByIdAndUpdate(
                id,
                parsedData.data,
                {new:true}
            );
            return res.status(200).json(updatedTransaction);
        }
        else{
            return res.status(401).json({message:"Not authorized to edit this transaction"});
        }
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
};


export async function deleteTransaction(req,res){
    try {
        const {id}=req.params;
        const transaction=await transactionModel.findById(id);
        if(!transaction) return res.status(404).json({message:"Transaction does not exist"});
        if(transaction.userId.toString()===req.user.id){
            await transactionModel.findByIdAndDelete(id);
            return res.status(200).json({message:"Transaction deleted",id});
        }
        else{
            return res.status(401).json({message:"Not authorized to delete this transaction"});
        }
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
}