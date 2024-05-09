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
    publicMetadata: {
      frameAvatar: {
        type: String,
        default: null,
      },
      premiumState: {
        type: Boolean,
        default: false,
      },
      premiumStartDate: {
        type: Date,
        default: null,
      },
      premiumEndDate: {
        type: Date,
        default: null,
      },
    },
    role: {
      type: String,
      enum: ["reader", "writer", "admin"],
      default: "reader",
    },
  },
  { timestamps: true }
);

UserSchema.methods.updatePremiumState = async function () {
  const now = new Date();
  if (this.publicMetadata.premiumEndDate) {
    if (now > this.premiumEndDate) {
      this.publicMetadata.premiumState = false;
      this.publicMetadata.premiumEndDate = null;
      this.publicMetadata.premiumStartDate = null;
    }
    await this.save();
  }
};

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
