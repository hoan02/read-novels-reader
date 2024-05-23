"use server";

import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Nomination from "../models/nomination.model";
import Novel from "../models/novel.model";
import MonthlyStats from "../models/monthlyStats.model";
import Comment from "../models/comment.model";

export const createComment = async (novelSlug: string, params: any) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Comment.findOneAndUpdate(
      {
        novelSlug,
      },
      {
        $set: {
          clerkId: userId,
          ...params,
        },
      },
      {
        new: true,
      }
    );

    return { success: true, message: "Bình luận thành công!" };
  } catch (error) {
    console.error("Create Comment Error:", error);
    throw new Error("Không thể bình luận!");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await Comment.findByIdAndDelete(commentId);
    return { success: true, message: "Xóa bình luận thành công!" };
  } catch (error) {
    console.error("Delete Comment Error:", error);
    throw new Error("Không thể xóa bình luận!");
  }
};
