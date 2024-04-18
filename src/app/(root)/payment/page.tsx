"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "qrcode.react";
import { toast } from "react-hot-toast";
import { toJpeg } from "html-to-image";
import { io, Socket } from "socket.io-client";
import { Check, Share2, Download } from "lucide-react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { cancelOrder } from "@/lib/actions/order.action";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bin = searchParams.get("bin");
  const checkoutUrl = searchParams.get("checkoutUrl");
  const accountNumber = searchParams.get("accountNumber");
  const accountName = searchParams.get("accountName");
  const amount = searchParams.get("amount");
  const description = searchParams.get("description");
  const orderCode = searchParams.get("orderCode");
  const qrCode = searchParams.get("qrCode");
  const socket = io(process.env.SOCKET_IO_URL!);

  // if (
  //   !bin ||
  //   !checkoutUrl ||
  //   !accountNumber ||
  //   !accountName ||
  //   !amount ||
  //   !description ||
  //   !orderCode ||
  //   !qrCode ||
  //   !socketUrl
  // ) {
  //   router.back();
  //   return null;
  // }

  const [open, setOpen] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCopyText = (textToCopy: string) => {
    // Tạo một textarea ẩn để sao chép nội dung
    toast.success("Sao chép thành công");
    navigator.clipboard.writeText(textToCopy);
  };

  const cancelOrderHandle = async () => {
    const res = await cancelOrder(orderCode!);
    router.push(`/payment/result?orderCode=${orderCode}`);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQRCode = async () => {
    var node = document.getElementById("my-node");
    if (!node) return;
    toJpeg(node, { quality: 0.95 })
      .then(function (dataUrl) {
        // download(dataUrl, "my-node.png");
        const link = document.createElement("a");
        link.download = `${accountNumber}_${bin}_${amount}_${orderCode}_QrCode.png`;
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  useEffect(() => {
    socket.on("paymentUpdated", (data) => {
      if (data.orderId === orderCode) {
        setIsCheckout(true);
        socket.emit("leaveOrderRoom", orderCode);

        setTimeout(() => {
          router.push(`/payment/results?orderCode=${orderCode}`);
        }, 3000);
      }
      // Cập nhật trạng thái đơn hàng trên giao diện người dùng
    });

    socket.emit("joinOrderRoom", orderCode);

    // Gửi yêu cầu rời khỏi phòng orderId khi component bị hủy
    return () => {
      socket.emit("leaveOrderRoom", orderCode);
    };
  }, []);

  return (
    <Box
      component={"div"}
      sx={{ flex: 3, borderWidth: 0.5, alignItems: "center" }}
      className="!border-gray-200 !border-solid rounded-2xl shadow p-5 !bg-gradient-to-r from-purple-300 to-blue-400 flex flex-col !w-full"
    >
      <Typography className="!text-xl !font-bold text-gray-700 pb-5">
        Thanh toán qua ngân hàng
      </Typography>
      <Box
        component={"div"}
        className="flex lg:flex-row w-full gap-10 md:flex-col sm:flex-row flex-col"
      >
        <Box
          component={"div"}
          className="flex flex-row self-center w-8/12 xl:w-4/12 2xl:w-3/12"
        >
          <Button className="w-full h-full" onClick={() => setOpenQR(true)}>
            <QRCode
              value={qrCode!}
              level="M"
              includeMargin={true}
              renderAs="svg"
              fgColor={"#25174E"}
              bgColor="transparent"
              style={{ borderRadius: 10, width: "100%", height: "100%" }}
              className="!bg-gradient-to-br from-green-200 via-purple-200 to-green-200"
            />
          </Button>
        </Box>
        <Box component={"div"} className="flex flex-col gap-5">
          <Box component={"div"} className="flex flex-row gap-2">
            <Image src="/MB_bank.png" alt="MB bank" width={100} height={55} />
            <Box component={"div"} className="flex flex-col">
              <Typography className="text-gray-900 text-opacity-70 !text-sm">
                Ngân hàng
              </Typography>
              <Typography className="text-gray-800 !text-sm !font-bold">
                Thương mại cổ phần Quân đội MB
              </Typography>
            </Box>
          </Box>
          <Box component={"div"} className="flex flex-col gap-2">
            <Box component={"div"} className="flex flex-row">
              <Box component={"div"} className="flex flex-col">
                <Typography className="text-gray-900 text-opacity-70 !text-sm">
                  Chủ tài khoản:
                </Typography>
                <Typography className="text-gray-800 !text-sm !font-bold">
                  {accountName}
                </Typography>
              </Box>
            </Box>
            <Box component={"div"} className="flex flex-row">
              <Box
                component={"div"}
                className="flex flex-col"
                sx={{ flex: 11 }}
              >
                <Typography className="text-gray-900 text-opacity-70 !text-sm">
                  Số tài khoản :
                </Typography>
                <Typography className="text-gray-800 !text-sm !font-bold">
                  {accountNumber}
                </Typography>
              </Box>
              {accountNumber && (
                <Button
                  variant="contained"
                  size="small"
                  className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                  sx={{ flex: 2 }}
                  onClick={() => handleCopyText(accountNumber)}
                >
                  <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                    Sao chép
                  </Typography>
                </Button>
              )}
            </Box>
            <Box component={"div"} className="flex flex-row">
              <Box
                component={"div"}
                className="flex flex-col"
                sx={{ flex: 11 }}
              >
                <Typography className="text-gray-900 text-opacity-70 !text-sm">
                  Số tiền :
                </Typography>
                <Typography className="text-gray-800 !text-sm !font-bold">
                  {amount} vnd
                </Typography>
              </Box>
              {amount && (
                <Button
                  variant="contained"
                  size="small"
                  className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                  sx={{ flex: 2 }}
                  onClick={() => handleCopyText(amount)}
                >
                  <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                    Sao chép
                  </Typography>
                </Button>
              )}
            </Box>
            <Box component={"div"} className="flex flex-row">
              <Box
                component={"div"}
                className="flex flex-col"
                sx={{ flex: 11 }}
              >
                <Typography className="text-gray-900 text-opacity-70 !text-sm">
                  Nội dung :
                </Typography>
                <Typography className="text-gray-800 !text-sm !font-bold ">
                  {description}
                </Typography>
              </Box>
              {description && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ flex: 2 }}
                  className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                  onClick={() => handleCopyText(description)}
                >
                  <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                    Sao chép
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>

          <Typography className="!text-sm text-gray-700">
            Lưu ý: Nhập chính xác nội dung{" "}
            <span className="!font-bold">{description}</span> khi chuyển khoản
          </Typography>
          <Box component={"div"} className="flex flex-row gap-5 items-center">
            {!isCheckout && (
              <>
                <CircularProgress />
                <Typography className="!text-lg text-gray-700">
                  Đơn hàng đang chờ được thanh toán
                </Typography>
              </>
            )}
            {isCheckout && (
              <>
                <Check size={30} className="text-green-500" />
                <Typography className="!text-lg text-gray-700">
                  Đơn hàng đã được thanh toán thành công
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Typography className="!text-sm text-gray-700 p-5">
        Mở App Ngân hàng bất kỳ để quét mã VietQR hoặc chuyển khoản chính xác
        nội dung bên trên
      </Typography>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="!bg-white h-10 w-40"
      >
        <Typography className={"normal-case !font-bold text-gray-700"}>
          Hủy thanh toán
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="self-center">
          {"Huỷ bỏ đơn hàng"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.primary" }}
          >
            Bạn có chắc muốn huỷ đơn hàng hay không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ bỏ</Button>
          <Button onClick={cancelOrderHandle} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {/*Dialog for Qr Code*/}
      <Dialog open={openQR} onClose={() => setOpenQR(false)}>
        <Box
          component={"div"}
          className="p-20 flex flex-col justify-center items-center gap-5"
        >
          <Typography className="text-center">
            Mở App Ngân hàng bất kỳ để quét mã VietQR
          </Typography>
          <QRCode
            id="my-node"
            value={qrCode!}
            level="M"
            includeMargin={true}
            renderAs="svg"
            fgColor={"#25174E"}
            bgColor="transparent"
            style={{ borderRadius: 10, width: "100%", height: "100%" }}
            className="!bg-gradient-to-br from-green-200 via-purple-200 to-green-200"
          />
          <Box component={"div"} className="flex flex-row gap-10 pt-10">
            <Button
              variant="outlined"
              startIcon={<Download />}
              color="inherit"
              onClick={downloadQRCode}
            >
              <Typography className="normal-case">Tải xuống</Typography>
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<Share2 />}>
              <Typography className="normal-case">Chia sẻ</Typography>
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;
