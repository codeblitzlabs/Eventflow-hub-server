import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();


router.get('/', getAllEvents);
router.post('/', protect, authorizeRoles('organizer'), createEvent);




export default router;