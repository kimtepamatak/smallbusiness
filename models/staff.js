const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    surname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    startdate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { collection: "staff" });

module.exports = mongoose.model("staff", staffSchema);