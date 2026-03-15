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

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizer', 'name email')
            .sort({ date: 1 }); // ascending by date

        res.status(200).json(events);

    } catch (err) {
        console.error('Get all events error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrganizerStats = async (req, res) => {
    try {
        const myEvents = await Event.find({ organizer: req.user.id });

        const totalEvents = myEvents.length;
        const totalRegistrations = myEvents.reduce(
            (sum, e) => sum + (e.bookedSeats || 0),
            0
        );

        res.status(200).json({ totalEvents, totalRegistrations });

    } catch (err) {
        console.error('Organizer stats error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};