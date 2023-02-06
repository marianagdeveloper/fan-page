const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    id: Number,
    name: String,
    image: String,
    gender: String,
    episode: Array,
    status: String,
    record: String,
    comment: String,
    user: String
}

);

module.exports = model('Favorite', favoriteSchema);