import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
dotenv.config();

async function Connect(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
Connect();
const app=express();
app.use(cors({
    origin:"https://vercel.com/gurpreets-projects-1c1382e7/personal-finance-tracker/Cjw5aAd19APRurnLu3MQ8WYfsAvj"
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/profile',profileRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`);});