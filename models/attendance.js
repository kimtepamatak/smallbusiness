const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    staffId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    numberhour: {
        type: Number,
        required: true,
    },
    bonus: {
        type: Number,
        required: true,
    },

}, { collection: "attendance" });

module.exports = mongoose.model("attendance", attendanceSchema);