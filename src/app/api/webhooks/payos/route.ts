import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const payload = await req.json();
  // cookies().set("PayOS", JSON.stringify(payload), { path: "/" });
  // cookies().set({
  //   name: "PayOS",
  //   value: JSON.stringify(payload),
  //   httpOnly: true,
  //   path: "/",
  // });
  console.log("Ok", payload);
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
