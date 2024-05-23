import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },
    novelSlug: {
      type: String,
      required: true,
      index: true,
    },
    chapterIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Reading =
  mongoose.models?.Reading || mongoose.model("Reading", readingSchema);

export default Reading;
