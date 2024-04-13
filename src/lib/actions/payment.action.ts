"use server";

import PayOs from "@/lib/payos/payOs";
import { WebhookType } from "@payos/node/lib/type";

export const paymentHandle = async (data: WebhookType) => {
  const webhookData = PayOs.verifyPaymentWebhookData(data);

  if (
    ["Ma giao dich thu nghiem", "VQRIO123"].includes(webhookData.description)
  ) {
    return {
      error: 0,
      message: "Ok",
      data: webhookData,
    };
  }

  // Source code uses webhook data
  return {
    error: 0,
    message: "Ok",
    data: webhookData,
  };
};

export const confirmWebhook = async (webhookUrl: string) => {
  try {
    await PayOs.confirmWebhook(webhookUrl);
    return {
      error: 0,
      message: "ok",
      data: null,
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
