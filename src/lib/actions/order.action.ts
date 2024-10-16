"use server";

import { auth } from "@clerk/nextjs/server";

import PayOs from "@/lib/payos/payOs";
import Order from "../models/order.model";
import connectToDB from "../mongodb/mongoose";

export const createOrder = async (order: string) => {
  try {
    const body = {
      orderCode: Number(String(new Date().getTime()).slice(-6)),
      amount: order === "month" ? 29000 : 259000,
      description: order === "month" ? "PREMIUM1T" : "PREMIUM1Y",
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/result`,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/result`,
    };
    const { userId } = auth();
    const paymentLinkRes = await PayOs.createPaymentLink(body);
    await Order.create({
      clerkId: userId,
      orderType: order,
      ...paymentLinkRes,
    });
    const res = {
      error: 0,
      message: "Success",
      paymentLinkId: paymentLinkRes.paymentLinkId,
    };
    return res;
  } catch (error) {
    console.log(error);
    const res = {
      error: -1,
      message: "fail",
      paymentLinkId: null,
    };
    return res;
  }
};

export const cancelOrder = async (paymentLinkId: string) => {
  try {
    await connectToDB();
    const order = await PayOs.cancelPaymentLink(paymentLinkId);
    await Order.findOneAndUpdate({ paymentLinkId }, { status: "CANCELLED" });
    if (!order) {
      return {
        error: -1,
        message: "failed",
        data: null,
      };
    }
    return {
      error: 0,
      message: "ok",
      data: order,
    };
  } catch (error) {
    console.error(error);
    return {
      error: -1,
      message: "failed",
      data: null,
    };
  }
};
