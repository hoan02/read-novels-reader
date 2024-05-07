import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
    },
    valueCharacter: {
      type: Number,
      required: true,
    },
    avgScore: {
      type: Number,
      default: 0,
    },
    valuePlot: {
      type: Number,
      required: true,
    },
    valueWorld: {
      type: Number,
      required: true,
    },
    reviewContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
