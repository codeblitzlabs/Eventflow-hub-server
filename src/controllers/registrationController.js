import Registration from '../models/Registration.js';
import Event from '../models/Event.js';


export const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id })
            .populate('event')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(registrations);

    } catch (err) {
        console.error('Get my registrations error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({ message: 'Event ID is required' });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if seats are available
        if (event.bookedSeats >= event.totalSeats) {
            return res.status(400).json({ message: 'No seats available' });
        }

        // Check if user already registered
        const existing = await Registration.findOne({ event: eventId, user: req.user.id });
        if (existing) {
            return res.status(409).json({ message: 'You are already registered for this event' });
        }

        // Create registration
        const registration = await Registration.create({
            event: eventId,
            user: req.user.id,
        });

        // Increment bookedSeats
        event.bookedSeats += 1;
        await event.save();

        await registration.populate('event');
        await registration.populate('user', 'name email');

        res.status(201).json({ message: 'Registered successfully', registration });

    } catch (err) {
        console.error('Register for event error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};