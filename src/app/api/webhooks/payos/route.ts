import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resSuccess = {
    code: "00",
    desc: "success",
  };

  return NextResponse.json(resSuccess, {
    status: 200,
  });
}

