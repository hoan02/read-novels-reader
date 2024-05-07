"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  SendHorizontal,
  Angry,
  Frown,
  Meh,
  Smile,
  Laugh,
  Grid2X2,
  FileText,
  X,
} from "lucide-react";
import { NovelType } from "@/lib/types";
import { createOrUpdateReview } from "@/lib/actions/review.action";
import { toast } from "react-hot-toast";
import { checkReview } from "@/lib/data/review.data";

interface StateType {
  label: string;
  icon: JSX.Element;
  color: string;
}

interface FormDataType {
  novelSlug: string;
  valueCharacter: number;
  valuePlot: number;
  valueWorld: number;
  reviewContent: string;
}

const labels = {
  1: "1/10",
  2: "2/10",
  3: "3/10",
  4: "4/10",
  5: "5/10",
  6: "6/10",
  7: "7/10",
  8: "8/10",
  9: "9/10",
  10: "10/10",
};

const states: StateType[] = [
  {
    label: "Như shit",
    icon: <Angry size={30} />,
    color: "text-red-600",
  },
  {
    label: "Tạm ổn",
    icon: <Frown size={30} />,
    color: "text-orange-600",
  },
  {
    label: "Được",
    icon: <Meh size={30} />,
    color: "text-yellow-600",
  },
  {
    label: "Olake phết",
    icon: <Smile size={30} />,
    color: "text-green-600",
  },
  {
    label: "Tuyệt đỉnh",
    icon: <Laugh size={30} />,
    color: "text-blue-600",
  },
];

const FormReview = ({ novelSlug }: { novelSlug: string }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [valueCharacter, setValueCharacter] = useState(0);
  const [valuePlot, setValuePlot] = useState(0);
  const [valueWorld, setValueWorld] = useState(0);
  const [hoverCharacter, setHoverCharacter] = useState(-1);
  const [hoverPlot, setHoverPlot] = useState(-1);
  const [hoverWorld, setHoverWorld] = useState(-1);
  const [reviewContent, setReviewContent] = useState("");
  const [state, setState] = useState<StateType>();
  const [openDialog, setOpenDialog] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  useEffect(() => {
    const checkReviewContent = async () => {
      const { data: dataReview, status } = await checkReview(novelSlug);
      if (status === 200) {
        setEvaluated(true);
        setValueCharacter(dataReview.valueCharacter);
        setValuePlot(dataReview.valuePlot);
        setValueWorld(dataReview.valueWorld);
        setReviewContent(dataReview.reviewContent);
      }
    };

    checkReviewContent();
  }, [novelSlug]);

  useEffect(() => {
    const roundedRating = (
      (valueCharacter + valuePlot + valueWorld) /
      3
    ).toFixed(1);
    setRating(parseFloat(roundedRating));
    const indexState = Math.floor((rating - 0.0001) / 2);
    setState(states[indexState]);
  }, [valueCharacter, valuePlot, valueWorld, rating]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      valueCharacter === 0 ||
      valuePlot === 0 ||
      valueWorld === 0 ||
      reviewContent.length < 10
    ) {
      toast.error(
        "Vui lòng đánh giá đầy đủ 3 mục thông tin và mô tả! Đọc lưu ý phía bên dưới!"
      );
      return;
    }
    setOpenDialog(true);
  };

  // Create review
  const handleCreateReview = async (formData: any) => {
    const res = await createOrUpdateReview(formData);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  const handleConfirmSubmit = async () => {
    setOpenDialog(false);
    const formData = {
      rating,
      novelSlug,
      valueCharacter,
      valuePlot,
      valueWorld,
      reviewContent,
    };
    try {
      router.refresh();
      handleCreateReview(formData);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <form
      className="bg-green-50 p-4 rounded-lg relative"
      onSubmit={handleSubmit}
    >
      {evaluated && (
        <div className="absolute right-2 top-2 p-2 rounded-full cursor-pointer hover:bg-slate-100 text-green-500">
          <X />
        </div>
      )}
      <div className="flex">
        <div className="w-2/3 font-semibold">
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Tính cách nhân vật</p>
            <Rating
              name="hover-feedback-character"
              value={valueCharacter}
              max={10}
              icon={<Laugh color="green" />}
              emptyIcon={<Laugh />}
              onChange={(event, newValue: any) => {
                setValueCharacter(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverCharacter(newHover);
              }}
            />
            {valueCharacter !== null &&
              (labels as { [key: string]: string })[
                (hoverCharacter !== -1
                  ? hoverCharacter
                  : valueCharacter
                ).toString()
              ]}
          </div>
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Nội dung cốt truyện</p>
            <Rating
              name="hover-feedback-plot"
              value={valuePlot}
              max={10}
              icon={<FileText color="green" />}
              emptyIcon={<FileText />}
              onChange={(event, newValue: any) => {
                setValuePlot(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverPlot(newHover);
              }}
            />
            {valuePlot !== null &&
              (labels as { [key: string]: string })[
                (hoverPlot !== -1 ? hoverPlot : valuePlot).toString()
              ]}
          </div>
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Bố cục thế giới</p>
            <Rating
              name="hover-feedback-world"
              value={valueWorld}
              max={10}
              icon={<Grid2X2 color="green" />}
              emptyIcon={<Grid2X2 />}
              onChange={(event, newValue: any) => {
                setValueWorld(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverWorld(newHover);
              }}
            />
            {valueWorld !== null &&
              (labels as { [key: string]: string })[
                (hoverWorld !== -1 ? hoverWorld : valueWorld).toString()
              ]}
          </div>
        </div>
        <div className="w-1/3 flex items-center gap-4">
          <div className="w-[80px] h-[80px] bg-white rounded-[40px] flex items-center justify-center">
            <p className="text-xl font-bold text-red-500">{rating}/10</p>
          </div>
          {state && (
            <div className={`flex items-center gap-2 ${state.color}`}>
              <p className="font-semibold">{state.label}</p>
              {state.icon}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 w-full relative">
        <TextField
          label="Đánh giá của bạn về truyện này"
          variant="outlined"
          multiline
          rows={3}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          fullWidth
        />

        <div
          className="absolute bottom-4 right-4 rounded-[24px] bg-green-600 p-3 cursor-pointer text-white hover:bg-green-700"
          onClick={handleSubmit}
        >
          <SendHorizontal size={24} />
        </div>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {evaluated ? "Chỉnh sửa đánh giá" : "Đánh giá"}
        </DialogTitle>
        <DialogContent>
          <p>Bạn có chắc chắn muốn gửi đánh giá không?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Thoát</Button>
          <Button variant="contained" onClick={handleConfirmSubmit}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default FormReview;
