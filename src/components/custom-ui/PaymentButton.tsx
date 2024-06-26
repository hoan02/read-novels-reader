"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

import { createOrder } from "@/lib/actions/order.action";

const PaymentButton = ({ order }: { order: string }) => {
  const router = useRouter();
  const [openDialogLoading, setOpenDialogLoading] = useState(false);

  const createPaymentLinkHandle = async (setLoading: any) => {
    setLoading(true);
    try {
      let response = await createOrder(order);

      if (response.error != 0) throw new Error("Call Api failed: ");
      setLoading(false);
      if (response.paymentLinkId != null) {
        // window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
        router.push(`/payment?paymentLinkId=${response.paymentLinkId}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <button
      onClick={() => createPaymentLinkHandle(setOpenDialogLoading)}
      disabled={openDialogLoading}
      className="mt-6 px-10 text-secondary py-2 border border-secondary hover:bg-secondary hover:text-white font-semibold rounded-lg"
    >
      Thanh toán
      {openDialogLoading ? (
        <>
          {" "}
          &nbsp; <CircularProgress className="!text-white" size={20} />
        </>
      ) : (
        ""
      )}
    </button>
  );
};

export default PaymentButton;
