import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
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
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.models?.Issue || mongoose.model("Issue", issueSchema);

export default Bookmark;
