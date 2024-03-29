"use server";

import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import createResponse from "@/utils/createResponse";

export const getNovel = async (novelSlug: string) => {
  try {
    await connectToDB();
    const { userId } = auth();
    const novel = await Novel.findOne({
      novelSlug: novelSlug,
    });

    if (!novel || novel.uploader !== userId) {
      return createResponse(null, "Không tìm thấy truyện!", 404);
    }

    return createResponse(novel, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getNovels = async () => {
  try {
    await connectToDB();
    const { userId } = auth();
    const novels = await Novel.find({
      uploader: userId,
    });
    return createResponse(novels, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
