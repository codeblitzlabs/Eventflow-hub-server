import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);