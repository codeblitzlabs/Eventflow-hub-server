import express from 'express';
import { getMyRegistrations, registerForEvent } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/my', protect, getMyRegistrations); // → /api/registrations/my
router.post('/',  protect, registerForEvent);


export default router;