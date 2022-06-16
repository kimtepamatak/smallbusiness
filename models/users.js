const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // isAdmin: {
    //     type: Boolean,
    //     required: true
    // },
    // username: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // registerAt: {
    //     type: String,
    //     required: true
    // }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);