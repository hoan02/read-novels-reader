"use client";

import { getOrder } from "@/lib/data/order.data";
import { PaymentLinkDataType } from "@payos/node/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TestPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentLinkId = searchParams.get("paymentLinkId");
  const [order, setOrder] = useState<PaymentLinkDataType>();

  useEffect(() => {
    const getOrderData = async () => {
      if (paymentLinkId) {
        const order = await getOrder(paymentLinkId);
        if (order.error === 0 && order.data) {
          setOrder(order.data);
        } else {
          router.push(`/payment/result?paymentLinkId=${paymentLinkId}`);
        }
      }
    };

    getOrderData();
    const intervalId = setInterval(getOrderData, 3000);
    return () => clearInterval(intervalId);
  }, [paymentLinkId]);

  console.log(order);

  return <div>{JSON.stringify(order)}</div>;
};

export default TestPage;
