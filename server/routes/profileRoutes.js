import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { deleteProfile, getProfile, updateProfile } from '../Controllers/profileController.js';
const router = express.Router();

router.route('/')
    .get(protect,getProfile)
    .put(protect,updateProfile)
    .delete(protect,deleteProfile);

export default router;