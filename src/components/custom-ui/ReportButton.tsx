"use client";

import { Fragment, ReactElement, Ref, forwardRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Flag } from "lucide-react";
import FormReport from "../issue/FormReport";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportButton = ({ novelSlug }: { novelSlug: string }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Tooltip title="Báo cáo">
        <IconButton onClick={handleClickOpen}>
          <Flag />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FormReport novelSlug={novelSlug} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ReportButton;
