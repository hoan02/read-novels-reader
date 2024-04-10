"use server";

import { connectToDB } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";
import Marked from "@/lib/models/marked.model";
import createResponse from "@/utils/createResponse";

export const getMarked = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    if (!userId) return createResponse(null, "Unauthorized!", 401);
    await connectToDB();
    let marked = await Marked.findOne({
      clerkId: userId,
      novelSlug,
    });

    if (!marked) {
      const newMarked = {
        clerkId: userId,
        novelSlug,
        chapterIndex: 0,
      };
      return createResponse(newMarked, "Success!", 200);
    }

    return createResponse(marked, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getRecentlyReadNovels = async (limit?: number) => {
  try {
    const { userId } = auth();
    await connectToDB();
    let query = Marked.find({
      clerkId: userId,
    }).sort({ lastReadAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    let marked = await query.exec();

    return createResponse(marked, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
