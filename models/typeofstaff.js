const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeofstaffSchema = new Schema({
    staffId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
}, { collection: "typeofstaff" });

module.exports = mongoose.model("typeofstaff", typeofstaffSchema);