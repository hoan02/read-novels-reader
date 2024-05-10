"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";

import Novel from "../models/novel.model";
import createResponse from "@/utils/createResponse";
import Bookmark from "../models/bookmark.model";

export const checkBookmark = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) return false;
    const bookmarked = await Bookmark.findOne({
      clerkId: userId,
      novelSlug,
    });
    if (!bookmarked) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getRecentlyBookmark = async (limit?: number) => {
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
          author: novel.author
        };
      })
    );

    return createResponse(markedWithNovels, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
