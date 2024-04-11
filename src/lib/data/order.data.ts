"use server";

import PayOs from "@/lib/payos/payOs";

export const getOrder = async (orderId: string) => {
  try {
    const order = await PayOs.getPaymentLinkInformation(orderId);
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
    console.log(error);
    return {
      error: -1,
      message: "failed",
      data: null,
    };
  }
};
