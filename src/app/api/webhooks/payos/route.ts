import { NextResponse } from "next/server";

import Order from "@/lib/models/order.model";
import connectToDB from "@/lib/mongodb/mongoose";
import PayOs from "@/lib/payos/payOs";
import { updateUserMetadata } from "@/lib/actions/clerk.action";

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

    const { code } = PayOs.verifyPaymentWebhookData(payload);

    if (code === "00") {
      const order = await PayOs.getPaymentLinkInformation(paymentLinkId);

      if (order) {
        const {
          status,
          transactions: [transaction],
        } = order;
        const existingOrder = await Order.findOneAndUpdate(
          { paymentLinkId },
          {
            $set: {
              status,
              "transaction.description": transaction.description,
              "transaction.reference": transaction.reference,
              "transaction.transactionDateTime":
                transaction.transactionDateTime,
            },
          },
          { new: true, upsert: true }
        );

        let endDate = new Date();
        if (existingOrder.orderType === "month") {
          endDate.setMonth(endDate.getMonth() + 1);
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        await updateUserMetadata(existingOrder.clerkId, {
          frame_avatar:
            existingOrder.orderType === "month"
              ? "reader-vip-1"
              : "reader-vip-2",
          premium: {
            state: true,
            startDate: new Date(),
            endDate: endDate,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
