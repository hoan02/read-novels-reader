"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import Chapter from "../models/chapter.model";

export const updateNovel = async (data: any) => {
  const { novelId, novelName, genres, author, urlCover, description } = data;

  try {
    await connectToDB();
    await Novel.findByIdAndUpdate(
      novelId,
      {
        novelName,
        genres,
        author,
        urlCover,
        description,
      },
      {
        new: true,
      }
    );
    revalidatePath("/danh-sach-truyen");
  } catch (err) {
    return new Error("Không thể cập nhật truyện!");
  }
};

