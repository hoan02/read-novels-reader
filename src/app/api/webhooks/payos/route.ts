import Order from "@/lib/models/order.model";
import PayOs from "@/lib/payos/payOs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const payload = await req.json();
  console.log(payload);
  const order = await PayOs.getPaymentLinkInformation(payload.id);
  if (order) {
    await Order.findOneAndUpdate(
      {
        paymentLinkId: payload.paymentLinkId,
      },
      {
        status: order.status,
      },
      {
        upsert: true,
      }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
