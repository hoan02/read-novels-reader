"use server";

import Comment from "../models/comment.model";
import connectToDB from "../mongodb/mongoose";
import createResponse from "@/utils/createResponse";

export const getComments = async (novelSlug: string) => {
  try {
    await connectToDB();
    const aggregation: any = [
      {
        $match: {
          novelSlug,
          parentId: null,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "userInfo",
        },
      },
      {
        $addFields: {
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
    ];

    const comments = await Comment.aggregate(aggregation);

    return createResponse(comments, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getReplyComment = async (commentId: string) => {
  try {
    await connectToDB();

    const aggregation = [
      {
        $match: { parentId: commentId },
      },
      {
        $sort: { createdAt: -1 as const },
      },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "userInfo",
        },
      },
      {
        $addFields: {
          userInfo: { $arrayElemAt: ["$userInfo", 0] },
        },
      },
    ];

    const replyComments = await Comment.aggregate(aggregation);

    return createResponse(replyComments, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
