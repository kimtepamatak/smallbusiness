const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    NameProduct: {
        type: String,
        required: true,
    },
    NumberProduct: {
        type: Number,
        required: true,
    },
    DateProduct: {
        type: String,
        required: true,
    },
    UnitPrice: {
        type: Number,
        required: true,
    },
    SellPrice: {
        type: Number,
        required: true,
    },
    Color: {
        type: String,
        required: true,
    },
    Size: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
}, { collection: "product" });

module.exports = mongoose.model("product", productSchema);