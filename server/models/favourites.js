const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
    {
        list: { type: [Number], required: true },
        owner: { type: Types.ObjectId, required: true, unique: true },
    },
    { versionKey: false },
);

module.exports = model('Favourites', schema);
