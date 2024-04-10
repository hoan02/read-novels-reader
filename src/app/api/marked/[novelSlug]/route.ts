"use server";

import { NextResponse } from "next/server";
import Marked from "@/lib/models/marked.model";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";

export const GET = async ({ params }: { params: { novelSlug: string } }) => {
  try {
    const { userId } = auth();
    await connectToDB();
    const marked = await Marked.findOne({
      clerkId: userId,
      novelSlug: params.novelSlug,
    });

    if (!marked) {
      const res = {
        clerkId: userId,
        novelSlug: params.novelSlug,
        chapterNumber: 0,
      };
      return NextResponse.json(res, { status: 200 });
    }

    return NextResponse.json(marked, { status: 200 });
  } catch (err) {
    console.log("markedNovel_GET", err);
    return NextResponse.json(
      { error: "Error in fetching marked novel" },
      {
        status: 500,
      }
    );
  }
};
