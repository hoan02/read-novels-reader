"use server";

import { NextResponse } from "next/server";
import Marked from "@/lib/models/marked.model";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";

export const GET = async () => {
  const { userId } = auth();

  try {
    await connectToDB();
    const userReadingProgress = await Marked.find({
      clerkId: userId,
    });
    return NextResponse.json(userReadingProgress, { status: 200 });
  } catch (err) {
    console.log("marked_GET", err);
    return NextResponse.json(
      { error: "Error in fetching marked" },
      {
        status: 500,
      }
    );
  }
};
