import express from 'express';
import { google, signin, signOut, signup } from '../controllers/authController.js';
import { test } from '../controllers/userController.js';
const router=express.Router();


router.get('/test',test);
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signOut);

export default router;