import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
    bookId: [{
        type: String,
        required: true
    }],
    userId: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Order = mongoose.model("Order", orderModel);
export default Order;