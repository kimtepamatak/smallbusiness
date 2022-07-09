const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outstockSchema = new Schema({
    ProductId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    numberSold: {
        type: Number,
        required: true,
    },
}, { collection: "outstock" });

module.exports = mongoose.model("outstock", outstockSchema);