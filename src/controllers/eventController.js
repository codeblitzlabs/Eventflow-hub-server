import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
    try {
        const { title, description, category, date, location, totalSeats, coverImage } = req.body;

        if (!title || !description || !date || !location || !totalSeats) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const event = await Event.create({
            title,
            description,
            category,
            date,
            location,
            totalSeats,
            coverImage,
            organizer: req.user.id,
        });

        res.status(201).json({ message: 'Event created successfully', event });

    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};