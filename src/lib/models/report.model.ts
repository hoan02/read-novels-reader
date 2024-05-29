import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },
    novelSlug: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageReply: {
      type: String,
      default: "",
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Report =
  mongoose.models?.Report || mongoose.model("Report", reportSchema);

export default Report;
