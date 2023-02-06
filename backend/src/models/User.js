const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    // Date created and Date updated
    timestamps: true
}

);

module.exports = model('User', userSchema);