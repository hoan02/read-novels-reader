import Order from "@/lib/models/order.model";
import connectToDB from "@/lib/mongodb/mongoose";
import PayOs from "@/lib/payos/payOs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const payload = await req.json();
    const paymentLinkId = payload.data.paymentLinkId;
    const verifyPayment = PayOs.verifyPaymentWebhookData(payload);
    if (verifyPayment.code === "00") {
      const order = await PayOs.getPaymentLinkInformation(paymentLinkId);
      if (order) {
        await Order.findOneAndUpdate(
          { paymentLinkId },
          {
            $set: {
              status: order.status,
              "transaction.description": order.transactions[0].description,
              "transaction.reference": order.transactions[0].reference,
              "transaction.transactionDateTime":
                order.transactions[0].transactionDateTime,
            },
          },
          { new: true, upsert: true }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
