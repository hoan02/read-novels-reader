import PayOs from "@/lib/payos/payOs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const payload = await req.json();
  const res = await PayOs.verifyPaymentWebhookData(payload);
  console.log("Ok", res);
  if (!payload.data) {
    console.log("Error");
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
