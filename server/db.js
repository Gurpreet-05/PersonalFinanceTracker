import mongoose from 'mongoose';
const schema=mongoose.Schema;
const objectId=schema.Types.ObjectId;

const userSchema=new schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    hash:{type:String,required:true},
},{timestamps:true});

const transactionSchema=new schema({
    userId:{ type:objectId, ref:'users',required:true},
    description:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    type:{type:String,enum:['income','expense'],required:true},
    category: {type:String, required:true, enum:['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Salary', 'Investment', 'Other']}
}, {timestamps:true});

const userModel=mongoose.model('User',userSchema);
const transactionModel=mongoose.model('Transaction',transactionSchema);

export {userModel,transactionModel};