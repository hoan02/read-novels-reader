"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";

import Bookmark from "@/lib/models/bookmark.model";
import Novel from "../models/novel.model";
import createResponse from "@/utils/createResponse";

export const getMarked = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) return createResponse(null, "Unauthorized!", 401);
    let marked = await Bookmark.findOne({
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
    await connectToDB();
    const { userId } = auth();
    let query = Bookmark.find({
      clerkId: userId,
    }).sort({ updatedAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    let marked = await query.exec();

    // Fetch the novel data for each marked item
    const markedWithNovels = await Promise.all(
      marked.map(async (mark: any) => {
        const novel = await Novel.findOne({ novelSlug: mark.novelSlug });
        return {
          ...mark._doc,
          novelName: novel.novelName,
          chapterCount: novel.chapterCount,
          urlCover: novel.urlCover,
        };
      })
    );

    return createResponse(markedWithNovels, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};