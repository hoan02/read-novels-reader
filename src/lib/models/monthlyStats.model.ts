import mongoose from "mongoose";

const monthlyStats = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const MonthlyStats =
  mongoose.models?.MonthlyStats || mongoose.model("MonthlyStats", monthlyStats);

export default MonthlyStats;