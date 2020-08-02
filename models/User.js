const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    password: { type: String, required: [true, 'Please provide a password'] }
})

UserSchema.plugin(uniqueValidator, { message: 'Username has been taken' });

UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User