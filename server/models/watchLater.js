import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        list: { type: [Number], required: true },
        owner: { type: mongoose.Types.ObjectId, required: true, unique: true },
    },
    { versionKey: false },
);

export default mongoose.model('WatchLater', schema);
