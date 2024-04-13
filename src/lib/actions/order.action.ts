"use server";

import PayOs from "@/lib/payos/payOs";
// import { auth } from "@clerk/nextjs";

export const createOrder = async (order: string) => {
  // const { userId } = auth();
  const body = {
    orderCode: Number(String(new Date().getTime()).slice(-6)),
    amount: order === "month" ? 29000 : 259000,
    description: order === "month" ? "PREMIUM1T" : "PREMIUM1Y",
    cancelUrl: `${process.env.PUBLIC_URL}payment/result`,
    returnUrl: `${process.env.PUBLIC_URL}payment/result`,
  };

  try {
    const paymentLinkRes = await PayOs.createPaymentLink(body);
    const res = {
      error: 0,
      message: "Success",
      data: {
        bin: paymentLinkRes.bin,
        checkoutUrl: paymentLinkRes.checkoutUrl,
        accountNumber: paymentLinkRes.accountNumber,
        accountName: paymentLinkRes.accountName,
        amount: paymentLinkRes.amount,
        description: paymentLinkRes.description,
        orderCode: paymentLinkRes.orderCode,
        qrCode: paymentLinkRes.qrCode,
      },
    };
    return res;
  } catch (error) {
    console.log(error);
    const res = {
      error: -1,
      message: "fail",
      data: null,
    };
    return res;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const order = await PayOs.cancelPaymentLink(orderId);
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

