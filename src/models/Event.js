import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, enum: ['Conference', 'Workshop', 'Seminar', 'Webinar', 'Meetup', 'Other'], default: 'Conference' },
    date:        { type: Date, required: true },
    location:    { type: String, required: true },
    totalSeats:  { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 },
    coverImage:  { type: String, default: '' },
    organizer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);