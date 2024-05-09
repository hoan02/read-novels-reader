"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Bookmark from "../models/bookmark.model";

export const createBookmark = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Bookmark.create({
      clerkId: userId,
      novelSlug,
    });
    revalidatePath("/");
    return { success: true, message: "Đánh dấu thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đánh dấu!");
  }
};
