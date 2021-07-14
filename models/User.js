const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, '`username` is required' ]
    },
    password: {
        type: String,
        required: [true, '`password` is required' ]
    },
    role: {
        type: String,
        enum: ['admin','user'],
        required: [true, '`role` is required' ],
        default: 'user'
    },
    refresh_token: {
        type: String,
    }
})

module.exports = mongoose.model("User", UserSchema)