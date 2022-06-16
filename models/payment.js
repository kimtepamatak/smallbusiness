const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    staffId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    paymentamount: {
        type: Number,
        required: true,
    },

}, { collection: "payment" });

module.exports = mongoose.model("payment", paymentSchema);