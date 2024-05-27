"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { checkBookmark } from "@/lib/data/bookmark.data";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmark.action";

const BookmarkButton = ({ novelSlug }: { novelSlug: string }) => {
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();
  const { data: bookmarkState, isLoading } = useQuery({
    queryKey: ["bookmark", novelSlug],
    queryFn: async () => {
      return await checkBookmark(novelSlug);
    },
    enabled: !!novelSlug,
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => {
      if (bookmarkState) {
        return deleteBookmark(novelSlug);
      } else {
        return createBookmark(novelSlug);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["bookmark"],
      });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });

  const handleClickBookmark = () => {
    if (!isSignedIn) {
      toast.error("Bạn cần đăng nhập thể thực hiện chức năng này!");
      return;
    }
    bookmarkMutation.mutate();
  };

  return (
    <Button
      variant={bookmarkState ? "contained" : "outlined"}
      size="large"
      style={{
        borderRadius: "30px",
        textTransform: "none",
      }}
      className="w-full lg:w-[168px]"
      startIcon={<Bookmark size={24} />}
      onClick={handleClickBookmark}
    >
      {bookmarkState ? "Đã đánh dấu" : "Đánh dấu"}
    </Button>
  );
};

export default BookmarkButton;
