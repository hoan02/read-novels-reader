import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Bookmark =
  mongoose.models?.Bookmark || mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
