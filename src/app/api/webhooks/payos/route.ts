import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const payload = await req.json();
  console.log(payload);
  if (!payload.data) {
    console.log("Error");
  }

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}
