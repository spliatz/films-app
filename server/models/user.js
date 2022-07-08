import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { versionKey: false },
);

export default mongoose.model('User', schema);
