import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderCode: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
  },
  transactionDateTime: {
    type: String,
  },
  paymentLinkId: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
