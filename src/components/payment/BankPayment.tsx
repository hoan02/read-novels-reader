"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

// import io from "socket.io-client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Check } from "lucide-react";
import { toast } from "react-hot-toast";
// import { toJpeg } from "html-to-image";
import { cancelOrder } from "@/lib/actions/order.action";

const BankPayment = ({ props }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  // const [bank, setBank] = useState(null);
  // const socket = io.connect(process.env.REACT_APP_ORDER_URL);

  const handleCopyText = (textToCopy: string) => {
    // Tạo một textarea ẩn để sao chép nội dung
    toast.success("Sao chép thành công");
    navigator.clipboard.writeText(textToCopy);
  };

  const cancelOrderHandle = async () => {
    const res = await cancelOrder(props.orderCode);
    console.log(res);
    router.push(`/result?orderCode=${props.orderCode}`);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const downloadQRCode = async () => {
  //   var node = document.getElementById("my-node");

  //   toJpeg(node, { quality: 0.95 })
  //     .then(function (dataUrl) {
  //       // download(dataUrl, "my-node.png");
  //       const link = document.createElement("a");
  //       link.download = `${props.accountNumber}_${props.bin}_${props.amount}_${props.orderCode}_Qrcode.png`;
  //       link.href = dataUrl;
  //       link.click();
  //       link.remove();
  //     })
  //     .catch(function (error) {
  //       console.error("oops, something went wrong!", error);
  //     });
  // };

  // useEffect(() => {
  //   if (!props?.bin) return;
  //   (async () => {
  //     getListBank()
  //       .then((res) => {
  //         const bank = res.data.filter((bank) => bank.bin === props.bin);
  //         setBank(bank[0]);
  //       })
  //       .catch((err) => console.log(err));
  //   })();
  //   socket.on("paymentUpdated", (data) => {
  //     if (data.orderId === props.orderCode) {
  //       setIsCheckout(true);
  //       socket.emit("leaveOrderRoom", props.orderCode);

  //       setTimeout(() => {
  //         navigate("/result", {
  //           state: {
  //             orderCode: props.orderCode,
  //           },
  //         });
  //       }, 3000);
  //     }

  //     // Cập nhật trạng thái đơn hàng trên giao diện người dùng
  //   });

  //   socket.emit("joinOrderRoom", props.orderCode);

  //   // Gửi yêu cầu rời khỏi phòng orderId khi component bị hủy
  //   return () => {
  //     socket.emit("leaveOrderRoom", props.orderCode);
  //   };
  // }, []);

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
              value={props.qrCode}
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
          {/* <Box component={"div"} className="flex flex-row gap-2">
            <img src={bank?.logo} width={100} height={55} />
            <Box component={"div"} className="flex flex-col">
              <Typography className="text-gray-900 text-opacity-70 !text-sm">
                Ngân hàng
              </Typography>
              <Typography className="text-gray-800 !text-sm !font-bold">
                {bank?.name}
              </Typography>
            </Box>
          </Box> */}
          <Box component={"div"} className="flex flex-col gap-2">
            <Box component={"div"} className="flex flex-row">
              <Box component={"div"} className="flex flex-col">
                <Typography className="text-gray-900 text-opacity-70 !text-sm">
                  Chủ tài khoản:
                </Typography>
                <Typography className="text-gray-800 !text-sm !font-bold">
                  {props.accountName}
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
                  {props.accountNumber}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                sx={{ flex: 2 }}
                onClick={() => handleCopyText(props.accountNumber)}
              >
                <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                  Sao chép
                </Typography>
              </Button>
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
                  {props.amount} vnd
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                sx={{ flex: 2 }}
                onClick={() => handleCopyText(props.amount)}
              >
                <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                  Sao chép
                </Typography>
              </Button>
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
                  {props.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{ flex: 2 }}
                className="h-7 !bg-purple-200 !object-right !ml-auto !my-auto"
                onClick={() => handleCopyText(props.description)}
              >
                <Typography className="!text-xs !font-bold text-gray-600 normal-case">
                  Sao chép
                </Typography>
              </Button>
            </Box>
          </Box>

          <Typography className="!text-sm text-gray-700">
            Lưu ý : Nhập chính xác nội dung{" "}
            <span className="!font-bold">{props.description}</span> khi chuyển
            khoản
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
            value={props.qrCode}
            level="M"
            includeMargin={true}
            renderAs="svg"
            fgColor={"#25174E"}
            bgColor="transparent"
            style={{ borderRadius: 10, width: "100%", height: "100%" }}
            className="!bg-gradient-to-br from-green-200 via-purple-200 to-green-200"
          />
          {/* <Box component={"div"} className="flex flex-row gap-10 pt-10">
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              color="inherit"
              onClick={downloadQRCode}
            >
              <Typography className="normal-case">Tải xuống</Typography>
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ShareIcon />}
            >
              <Typography className="normal-case">Chia sẻ</Typography>
            </Button>
          </Box> */}
        </Box>
      </Dialog>
    </Box>
  );
};

export default BankPayment;
