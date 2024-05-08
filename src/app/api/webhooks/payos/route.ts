import Order from "@/lib/models/order.model";
import User from "@/lib/models/user.model";
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

        var endDate = new Date();
        if (existingOrder.orderType === "PREMIUM1T") {
          endDate.setMonth(endDate.getMonth() + 1);
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        await User.findOneAndUpdate(
          { clerkId: existingOrder.clerkId },
          {
            $set: {
              "premium.state": true,
              "premium.startDate": new Date(),
              "premium.endDate": endDate,
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
