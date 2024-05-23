import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook FACEBOOK!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const payload = await req.json();
  console.log(payload);
  return NextResponse.json(payload, {
    status: 200,
  });
}
