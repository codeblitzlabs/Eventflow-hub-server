import express from 'express';
import { createEvent } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Only logged-in organizers/admins can create events
router.post('/', protect, authorizeRoles('organizer'), createEvent);

export default router;