"use client";

import { Fragment, ReactElement, Ref, forwardRef, useState } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { SignIn } from "@clerk/nextjs";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FallbackLogin = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {message}{" "}
      <span
        className="cursor-pointer text-blue-500 hover:text-blue-600"
        onClick={handleClickOpen}
      >
        Đăng nhập ngay
      </span>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <SignIn />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default FallbackLogin;
