"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { checkBookmark } from "@/lib/data/bookmark.data";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmark.action";
import toast from "react-hot-toast";

const BookmarkButton = ({ novelSlug }: { novelSlug: string }) => {
  const queryClient = useQueryClient();
  const { data: bookmarkState, isLoading } = useQuery({
    queryKey: ["bookmark", novelSlug],
    queryFn: async () => {
      return await checkBookmark(novelSlug);
    },
    enabled: !!novelSlug,
  });

  const handleClickBookmark = useMutation({
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
      // revalidatePath("/");
    },
    onError: (res) => {
      toast.error(res.message);
      // revalidatePath("/");
    },
  });

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
      onClick={() => handleClickBookmark.mutate()}
    >
      {bookmarkState ? "Đã đánh dấu" : "Đánh dấu"}
    </Button>
  );
};

export default BookmarkButton;
