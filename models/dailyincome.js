const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyincomeSchema = new Schema({
    UserId: {
        type: String,
        required: true,
    },
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
    extraFee: {
        type: Number,
        required: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
    },
}, { collection: "dailyincome" });

module.exports = mongoose.model("dailyincome", dailyincomeSchema);