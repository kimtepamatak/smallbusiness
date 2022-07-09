const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const totalincomeSchema = new Schema({
    Date: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, { collection: "totalincome" });

module.exports = mongoose.model("totalincome", totalincomeSchema);