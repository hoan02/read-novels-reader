"use server";

import PayOs from "@/lib/payos/payOs";

export const paymentHandle = async (data: any) => {
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
