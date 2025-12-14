import jwt from 'jsonwebtoken';
import { userModel } from '../db.js';

export async function protect(req,res,next){
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await userModel.findById(decoded.id).select('-hash');
            next();
        } catch (e) {
            console.log(e);
            res.status(401).json({message:"Token failed, authorization denied"});
        }
    }
    else{
        res.status(401).json({message:"No token, authorization denied"});
    }
}