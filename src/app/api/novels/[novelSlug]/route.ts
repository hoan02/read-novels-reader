"use server";

import { NextResponse } from "next/server";
import Novel from "@/lib/models/novel.model";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (context: any) => {
  const { params } = context;
  try {
    await connectToDB();

    const novel = await Novel.findOne({
      novelSlug: params.novelSlug,
      isPublic: true,
    });

    return NextResponse.json(novel, { status: 200 });
  } catch (err) {
    console.log("[novel_GET]", err);
    return NextResponse.json(
      { error: "Error in fetching novel" },
      {
        status: 500,
      }
    );
  }
};
