import mongoose from "mongoose";

const markedSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
    chapterIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Marked =
  mongoose.models?.Marked || mongoose.model("Marked", markedSchema);

export default Marked;
