import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    messages: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
