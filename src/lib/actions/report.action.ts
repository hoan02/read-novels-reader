"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import connectToDB from "@/lib/mongodb/mongoose";
import Report from "../models/report.model";

export const createReport = async (params: any) => {
  try {
    const { userId } = auth();
    await connectToDB();
    await Report.create({
      clerkId: userId,
      ...params,
    });
    revalidatePath(`/tai-khoan/ho-tro`);
    return { success: true, message: "Gửi báo cáo thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể gửi báo cáo!");
  }
};
