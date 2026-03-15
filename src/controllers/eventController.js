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

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);

    } catch (err) {
        console.error('Get event by id error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Only the organizer who created it or admin can update
        if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        const { title, description, category, date, location, totalSeats, coverImage } = req.body;

        event.title       = title       ?? event.title;
        event.description = description ?? event.description;
        event.category    = category    ?? event.category;
        event.date        = date        ?? event.date;
        event.location    = location    ?? event.location;
        event.totalSeats  = totalSeats  ?? event.totalSeats;
        event.coverImage  = coverImage  ?? event.coverImage;

        const updated = await event.save();

        res.status(200).json({ message: 'Event updated successfully', event: updated });

    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Only the organizer who created it or admin can delete
        if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await event.deleteOne();

        res.status(200).json({ message: 'Event deleted successfully' });

    } catch (err) {
        console.error('Delete event error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

