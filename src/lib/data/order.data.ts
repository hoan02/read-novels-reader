"use server";

import PayOs from "@/lib/payos/payOs";
import connectToDB from "../mongodb/mongoose";
import Order from "../models/order.model";
import createResponse from "@/utils/createResponse";

// export const getOrder = async (paymentLinkId: string) => {
//   try {
//     const order = await PayOs.getPaymentLinkInformation(paymentLinkId);
//     if (!order) {
//       return {
//         error: -1,
//         message: "failed",
//         data: null,
//       };
//     }
//     return {
//       error: 0,
//       message: "ok",
//       data: order,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       error: -1,
//       message: "failed",
//       data: null,
//     };
//   }
// };

export const getOrder = async (paymentLinkId: string) => {
  console.log(paymentLinkId);
  try {
    await connectToDB();
    const order = await Order.findOne({ paymentLinkId });

    if (!order) {
      return createResponse(null, "Không tìm thấy đơn hàng!", 404);
    }

    return createResponse(order, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
