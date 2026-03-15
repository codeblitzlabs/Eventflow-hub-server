import express from 'express';
import { getOrganizerStats } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, authorizeRoles('organizer', 'admin'), getOrganizerStats);

export default router;