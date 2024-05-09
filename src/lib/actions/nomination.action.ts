"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import connectToDB from "@/lib/mongodb/mongoose";
import Nomination from "../models/nomination.model";

export const createNomination = async (novelSlug: string) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Nomination.create({
      clerkId: userId,
      novelSlug,
    });
    revalidatePath("/");
    return { success: true, message: "Đề cử thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể đề cử!");
  }
};
