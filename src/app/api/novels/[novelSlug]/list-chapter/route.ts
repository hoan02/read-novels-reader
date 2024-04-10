"use server";

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Chapter from "@/lib/models/chapter.model";

export const GET = async ({ params }: { params: { novelSlug: string } }) => {
  try {
    await connectToDB();
    const chapters = await Chapter.find({
      novelSlug: params.novelSlug,
      isPublic: true,
    });

    return NextResponse.json(chapters, { status: 200 });
  } catch (err) {
    console.log("[list-chapter_GET]", err);
    return NextResponse.json(
      { error: "Error in fetching chapters" },
      {
        status: 500,
      }
    );
  }
};
