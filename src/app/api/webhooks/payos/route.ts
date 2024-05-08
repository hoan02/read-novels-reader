import Order from "@/lib/models/order.model";
import PayOs from "@/lib/payos/payOs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Welcome to the Webhook PAYOS API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const verifyPayment = PayOs.verifyPaymentWebhookData(payload);
    console.log("verifyPayment ", verifyPayment);
    if (verifyPayment.code === "00") {
      const order = await PayOs.getPaymentLinkInformation(
        payload.data.paymentLinkId
      );
      console.log("order ", order);
      // if (order) {
      //   await Order.findOneAndUpdate(
      //     {
      //       paymentLinkId: payload.paymentLinkId,
      //     },
      //     {
      //       status: order.status,
      //       "transactions.description": order.transactions[0].description,
      //       "transactions.reference": order.transactions[0].reference,
      //       "transactions.transactionDateTime":
      //         order.transactions[0].transactionDateTime,
      //     },
      //     { new: true, upsert: true }
      //   );
      // }
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
