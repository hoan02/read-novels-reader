import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    novelName: {
      type: String,
      required: true,
    },
    novelSlug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genres: [
      {
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    urlCover: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nominations: {
      type: Number,
      default: 0,
    },
    reviews: {
      count: {
        type: Number,
        default: 0,
      },
      avgScore: {
        type: Number,
        default: 0,
      },
      avgScoreCharacter: {
        type: Number,
        default: 0,
      },
      avgScorePlot: {
        type: Number,
        default: 0,
      },
      avgScoreWorld: {
        type: Number,
        default: 0,
      },
      totalScoreCharacter: {
        type: Number,
        default: 0,
      },
      totalScorePlot: {
        type: Number,
        default: 0,
      },
      totalScoreWorld: {
        type: Number,
        default: 0,
      },
    },
    readCount: {
      type: Number,
      default: 0,
    },
    chapterCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: "Đang ra",
    },
    isLock: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

novelSchema.index({ name: "text" });

const Novel = mongoose.models?.Novel || mongoose.model("Novel", novelSchema);

export default Novel;
