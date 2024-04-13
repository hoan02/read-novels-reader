"use client";

import { confirmWebhook } from "@/lib/actions/payment.action";
import { Button } from "@mui/material";

const page = () => {
  const handleConfirm = async () => {
    await confirmWebhook("https://doctruyen.io.vn/api/webhooks/payos");
  };
  return (
    <div className="bg-white h-[300px] flex justify-center">
      <div className="mt-20 space-y-10">
        <h1 className="text-3xl">Test Webhook payos</h1>
        <div className="flex justify-center">
          <Button variant="outlined" onClick={() => handleConfirm()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
