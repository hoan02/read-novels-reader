"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import { generateSlug } from "@/utils/generateSlug";
import Chapter from "../models/chapter.model";

export const createNovel = async (data: any) => {
  const { novelName, author, genres, description, urlCover } = data;
  const novelSlug = generateSlug(novelName);
  try {
    const { userId } = auth();
    await connectToDB();
    const newNovel = new Novel({
      novelName,
      novelSlug,
      author,
      genres,
      description,
      urlCover,
      uploader: userId,
    });
    await newNovel.save();
    revalidatePath("/danh-sach-truyen");
    return { success: true, message: "Truyện đã được tạo thành công!" };
  } catch (error) {
    console.error(error);
    return new Error("Không thể tạo truyện!");
  }
};

export const updateNovel = async (data: any) => {
  const { novelId, novelName, genres, author, urlCover, description } = data;
  const novelSlug = generateSlug(novelName);
  try {
    await connectToDB();
    await Novel.findByIdAndUpdate(
      novelId,
      {
        novelName,
        novelSlug,
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

export const deleteNovel = async (novelId: string) => {
  try {
    await connectToDB();

    const novel = await Novel.findById(novelId);
    if (!novel) {
      return new Error("Không tìm thấy truyện!");
    }

    // await Rating.deleteMany({ novelId: novelId });
    await Chapter.deleteMany({ novelSlug: novel.novelSlug });
    // await Marked.deleteMany({ novelSlug: novel.slug });

    const deletedNovel = await Novel.findByIdAndDelete(novelId);
    if (!deletedNovel) {
      return new Error("Không tìm thấy truyện!");
    }
    revalidatePath(`/danh-sach-truyen`);
    return { success: true, message: "Truyện đã được xóa!" };
  } catch (error) {
    console.error(error);
    return new Error("Không thể xóa truyện!");
  }
};

export const checkNovelName = async (novelName: string) => {
  const novelSlug = generateSlug(novelName);
  await connectToDB();
  const novel = await Novel.findOne({ novelSlug });
  return { found: novel ? true : false };
};
