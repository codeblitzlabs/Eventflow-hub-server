import express from 'express';
import { createEvent, getAllEvents , getEventById, updateEvent , deleteEvent} from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();


router.get('/', getAllEvents);
router.post('/', protect, authorizeRoles('organizer'), createEvent);
router.get('/:id', getEventById);
router.put('/:id', protect, authorizeRoles('organizer'), updateEvent);
router.delete('/:id',protect, authorizeRoles('organizer'), deleteEvent);



export default router;