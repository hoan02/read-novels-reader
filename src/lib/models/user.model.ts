import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    metadata: {
      frameAvatar: {
        type: String,
        default: null,
      },
    },
    
    role: {
      type: String,
      enum: ["reader", "writer", "admin"],
      default: "reader",
    },
    premium: {
      state: {
        type: Boolean,
        default: false,
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.updatePremiumState = async function () {
  const now = new Date();
  if (this.premium.endDate) {
    if (now > this.premium.endDate) {
      this.premium.endDate = null;
      this.premium.startDate = null;
      this.premium.state = false;
    }
    await this.save();
  }
};

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
