import z from 'zod';
import { transactionModel, userModel } from '../db.js';

const profileSchema=z.object({
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    email: z.email().optional()
})

export async function getProfile(req,res) {
    try {
        const user=await userModel.findById(req.user.id).select('-hash');
        if(user) res.status(200).json(user);
        else res.status(404).json({message:"User does not exist"});
    } catch (e) {
        res.status(500).json({message:e.message});
    }
}
export async function updateProfile(req,res) {
    try {
        const parsedData=profileSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({message:"Invalid data",errors:z.treeifyError(parsedData.error)});
        }
        const user=await userModel.findById(req.user.id);
        if(user){
            user.firstName=parsedData.data.firstName || user.firstName;
            user.lastName=parsedData.data.lastName || user.lastName;
            if(parsedData.data.email && parsedData.data.email!==user.email){
                const emailExists=await userModel.findOne({email:parsedData.data.email});
                if(emailExists) return res.status(400).json({message:"email already in use"});
                user.email=parsedData.data.email;
            }
            const updatedUser=await user.save();
            return res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
            });
        }
        else res.status(404).json({message:"user does not exist"});
    } catch (e) {
        res.status(500).json({message:e.message});
    }   
}
export async function deleteProfile(req,res) {
    try {
        const user=await userModel.findById(req.user.id);
        if(!user) return res.status(404).json({message:"User does not exist"});
        await transactionModel.deleteMany({userId:req.user.id});
        await user.deleteOne();
        res.status(200).json({message:"User and all their transactions deleted"});
    } catch (e) {
        res.status(500).json({message:e.message});
    }
}