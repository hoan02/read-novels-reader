"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";

import createResponse from "@/utils/createResponse";
import Issue from "../models/report.model";

export const getReport = async () => {
  try {
    await connectToDB();
    const { userId } = auth();
    const issues = await Issue.find({
      clerkId: userId,
    });
    return createResponse(issues, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
