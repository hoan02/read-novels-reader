"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  createOrUpdateReview,
  deleteReview,
} from "@/lib/actions/review.action";
import { toast } from "react-hot-toast";
import { getReview } from "@/lib/data/review.data";

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

interface ReviewDataType {
  novelSlug: string;
  rating: number;
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
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ReviewDataType>({
    novelSlug: novelSlug,
    rating: 0,
    valueCharacter: 0,
    valuePlot: 0,
    valueWorld: 0,
    reviewContent: "",
  });

  const [hoverCharacter, setHoverCharacter] = useState(-1);
  const [hoverPlot, setHoverPlot] = useState(-1);
  const [hoverWorld, setHoverWorld] = useState(-1);
  const [state, setState] = useState<StateType>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const handleChangeRating =
    (field: keyof ReviewDataType) =>
    (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
      if (newValue !== null) {
        setFormData((prevState) => ({ ...prevState, [field]: newValue }));
      }
    };

  const handleChangeText =
    (field: keyof ReviewDataType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    };

  const { isLoading } = useQuery({
    queryKey: [`review-${novelSlug}`],
    queryFn: async () =>
      await getReview(novelSlug).then((res) => {
        if (res.status === 200) {
          setFormData(res.data);
          setEvaluated(true);
        }
      }),
    enabled: !!novelSlug,
  });

  const createOrUpdateReviewMutation = useMutation({
    mutationFn: (formData: ReviewDataType) => createOrUpdateReview(formData),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: [`review-${novelSlug}`] });
      // Optional: revalidatePath("/");
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      formData.valueCharacter === 0 ||
      formData.valuePlot === 0 ||
      formData.valueWorld === 0 ||
      formData.reviewContent.length < 10
    ) {
      toast.error(
        "Vui lòng đánh giá đầy đủ 3 mục thông tin và mô tả! Đọc lưu ý phía bên dưới!"
      );
      return;
    }
    setOpenDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setOpenDialog(false);
    createOrUpdateReviewMutation.mutate(formData);
  };

  // DELETE
  const deleteReviewMutation = useMutation({
    mutationFn: () => deleteReview(novelSlug),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: [`review-${novelSlug}`] });
      router.refresh();
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleDeleteReview = async () => {
    setOpenDialogDelete(false);
    await deleteReviewMutation.mutate();
  };

  useEffect(() => {
    const roundedRating = (
      (formData.valueCharacter + formData.valuePlot + formData.valueWorld) /
      3
    ).toFixed(1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: parseFloat(roundedRating),
    }));
    const indexState = Math.floor((formData.rating - 0.0001) / 2);
    setState(states[indexState]);
  }, [
    formData.valueCharacter,
    formData.valuePlot,
    formData.valueWorld,
    isLoading,
  ]);

  return (
    <form
      className="bg-green-50 p-4 rounded-lg relative"
      onSubmit={handleSubmit}
    >
      {evaluated && (
        <div
          className="absolute right-2 top-2 p-2 rounded-full cursor-pointer hover:bg-slate-100 text-green-500"
          onClick={() => setOpenDialogDelete(true)}
        >
          <X />
        </div>
      )}
      <div className="flex">
        <div className="w-2/3 font-semibold">
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Tính cách nhân vật</p>
            <Rating
              name="hover-feedback-character"
              value={formData.valueCharacter}
              max={10}
              icon={<Laugh color="green" />}
              emptyIcon={<Laugh />}
              onChange={handleChangeRating("valueCharacter")}
              onChangeActive={(event, newHover) => {
                setHoverCharacter(newHover);
              }}
            />
            {formData.valueCharacter !== null &&
              (labels as { [key: string]: string })[
                (hoverCharacter !== -1
                  ? hoverCharacter
                  : formData.valueCharacter
                ).toString()
              ]}
          </div>
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Nội dung cốt truyện</p>
            <Rating
              name="hover-feedback-plot"
              value={formData.valuePlot}
              max={10}
              icon={<FileText color="green" />}
              emptyIcon={<FileText />}
              onChange={handleChangeRating("valuePlot")}
              onChangeActive={(event, newHover) => {
                setHoverPlot(newHover);
              }}
            />
            {formData.valuePlot !== null &&
              (labels as { [key: string]: string })[
                (hoverPlot !== -1 ? hoverPlot : formData.valuePlot).toString()
              ]}
          </div>
          <div className="p-2 flex items-center gap-4">
            <p className="w-[160px]">Bố cục thế giới</p>
            <Rating
              name="hover-feedback-world"
              value={formData.valueWorld}
              max={10}
              icon={<Grid2X2 color="green" />}
              emptyIcon={<Grid2X2 />}
              onChange={handleChangeRating("valueWorld")}
              onChangeActive={(event, newHover) => {
                setHoverWorld(newHover);
              }}
            />
            {formData.valueWorld !== null &&
              (labels as { [key: string]: string })[
                (hoverWorld !== -1
                  ? hoverWorld
                  : formData.valueWorld
                ).toString()
              ]}
          </div>
        </div>
        <div className="w-1/3 flex items-center gap-4">
          <div className="w-[80px] h-[80px] bg-white rounded-[40px] flex items-center justify-center">
            <p className="text-xl font-bold text-red-500">
              {formData.rating}/10
            </p>
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
          className="bg-white"
          variant="outlined"
          multiline
          rows={3}
          value={formData.reviewContent}
          onChange={handleChangeText("reviewContent")}
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

      <Dialog
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(false)}
      >
        <DialogTitle>
          <span className="text-red-600">Xóa đánh giá</span>
        </DialogTitle>
        <DialogContent>
          <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogDelete(false)}>Thoát</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteReview}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default FormReview;
