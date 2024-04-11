import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
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

const Bookmark =
  mongoose.models?.Bookmark || mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
