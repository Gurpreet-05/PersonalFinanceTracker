import {userModel} from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import z from 'zod';

function generateToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}

export async function registerUser(req,res){
    try {
        const reqBody = z.object({
            firstName: z.string().max(100, "firstName must be less than 100 letters"),
            lastName: z.string().max(100, "lastName must be less than 100 letters"),
            email : z.string().email("Email not in correct format"),
            password : z.string().min(8, "Password must be atleast 8 characters")
        })
        const parsedData=reqBody.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({ 
                message:"Invalid user data",
                error:parsedData.error.errors
            });
        }
        const { firstName, lastName, email, password } = req.body;
        const userExists=await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const hash=await bcrypt.hash(password,10);
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            hash
        });
        if(user){
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                email: user.email,
                token: generateToken(user.id),
            });
        }
        else{
            res.status(400).json({message:'Invalid user data'});
        }
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
export async function loginUser(req,res) {
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});

        if(user && (await bcrypt.compare(password,user.hash))){
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                email: user.email,
                token: generateToken(user.id),
            });
        }
        else res.status(400).json({message:'Invalid email or password'});
    } catch (error) {
        return res.status(500).json({message:"error.message"});
    }
}

