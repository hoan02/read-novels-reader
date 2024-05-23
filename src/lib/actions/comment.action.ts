"use server";

import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Comment from "../models/comment.model";
import Novel from "../models/novel.model";
import { revalidatePath } from "next/cache";

export const createComment = async (params: any) => {
  try {
    const { userId } = auth();
    await connectToDB();

    await Comment.create({
      clerkId: userId,
      ...params,
    });

    await Novel.findOneAndUpdate(
      {
        novelSlug: params.novelSlug,
      },
      {
        $inc: { commentCount: 1 },
      }
    );

    revalidatePath(`/truyen/${params.novelSlug}`);
    return { success: true, message: "Bình luận thành công!" };
  } catch (error) {
    console.error("Create Comment Error:", error);
    throw new Error("Không thể bình luận!");
  }
};

export const updateComment = async (commentId: string, params: any) => {
  try {
    await connectToDB();
    await Comment.findByIdAndUpdate(commentId, params);
    return { success: true, message: "Cập nhật bình luận thành công!" };
  } catch (error) {
    console.error("Update Comment Error:", error);
    throw new Error("Không thể cập nhật bình luận!");
  }
};

export const updateLikeComment = async (commentId: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Không tìm thấy bình luận!");
    }

    const index = comment.likes.findIndex(
      (like: any) => like.clerkId === userId
    );

    if (index !== -1) {
      comment.likes.splice(index, 1);
    } else {
      comment.likes.push({ clerkId: userId });
    }

    await comment.save();

    return {
      commentId,
      success: true,
      message: "Cập nhật bình luận thành công!",
    };
  } catch (error) {
    console.error("Update Comment Error:", error);
    throw new Error("Không thể cập nhật bình luận!");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    await Novel.findOneAndUpdate(
      {
        novelSlug: comment.novelSlug,
      },
      {
        $inc: { commentCount: -1 },
      }
    );
    return { success: true, message: "Xóa bình luận thành công!" };
  } catch (error) {
    console.error("Delete Comment Error:", error);
    throw new Error("Không thể xóa bình luận!");
  }
};
