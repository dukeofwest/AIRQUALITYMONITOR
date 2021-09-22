//set up mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String
}, {timestamps: true});
//Mongoose model for creating, deleting, and updating db
module.exports = mongoose.model('user', userSchema, 'users')