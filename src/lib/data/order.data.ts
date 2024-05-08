"use server";

import PayOs from "@/lib/payos/payOs";
import connectToDB from "../mongodb/mongoose";
import Order from "../models/order.model";
import createResponse from "@/utils/createResponse";

export const getOrder = async (paymentLinkId: string) => {
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

export const getO = async (paymentLinkId: string) => {
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
