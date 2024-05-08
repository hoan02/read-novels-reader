import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      enum: ["month", "year"],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
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
    bin: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    paymentLinkId: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    checkoutUrl: {
      type: String,
      required: true,
    },
    transaction: {
      description: {
        type: String,
        default: "",
      },
      reference: {
        type: String,
        default: "",
      },
      transactionDateTime: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Order;
