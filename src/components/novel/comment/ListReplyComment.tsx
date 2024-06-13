"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { EllipsisVertical } from "lucide-react";
import { IconButton, LinearProgress, Menu, MenuItem } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import Error from "@/components/layouts/Error";
import {
  deleteReplyComment,
  updateLikeComment,
} from "@/lib/actions/comment.action";
import { getReplyComment } from "@/lib/data/comment.data";
import formatTimeAgo from "@/utils/formatTimeAgo";

const ListReplyComment = ({
  novelSlug,
  parentId,
}: {
  novelSlug: string;
  parentId: string;
}) => {
  const queryClient = useQueryClient();
  const { isSignedIn, userId } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: replyComments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`replies-${parentId}`],
    queryFn: () => getReplyComment(parentId),
    enabled: !!parentId && !!novelSlug,
  });

  const likeMutation = useMutation({
    mutationFn: (commentId: string) => updateLikeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`replies-${parentId}`] });
    },
    onError: (error) => {
      console.error("Error submitting comment:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleLike = (commentId: string) => {
    if (!isSignedIn) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này!");
      return;
    }
    likeMutation.mutate(commentId);
  };

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteReplyComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`replies-${parentId}`],
      });
      toast.success("Xóa bình luận thành công");
    },
    onError: (error) => {
      console.error("Error delete comment:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleDelete = (commentId: string) => {
    handleClose();
    deleteMutation.mutate(commentId);
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Error />;

  return (
    <div className="">
      {replyComments?.data?.map((replyComment: any) => (
        <div key={replyComment._id} className="m-2 pr-0">
          <div className="flex gap-2 lg:gap-4">
            <div className="min-w-[40px] lg:min-w-[60px]">
              <AvatarFrame
                className="w-[40px] lg:w-[60px]"
                src={replyComment.userInfo?.avatar}
                frame={replyComment.userInfo?.publicMetadata?.frameAvatar}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="max-w-max min-w-[160px] p-2 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold">
                    {replyComment.userInfo?.firstName}{" "}
                    {replyComment.userInfo.lastName}
                  </div>
                  {replyComment.userInfo.clerkId === userId && (
                    <>
                      <IconButton size="small" onClick={handleClick}>
                        <EllipsisVertical size={12} />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => handleDelete(replyComment._id)}
                        >
                          <span className="text-xs">Xóa</span>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </div>
                <div className="mt-2 text-gray-500 text-sm font-mono">
                  {replyComment.message}
                </div>
              </div>
              <div className="flex gap-4 text-xs">
                <p className="">{formatTimeAgo(replyComment.createdAt)}</p>
                <div
                  onClick={() => handleLike(replyComment._id)}
                  className={`font-semibold cursor-pointer ${
                    replyComment.likes.includes(userId)
                      ? "text-sky-500"
                      : "text-gray-700"
                  }`}
                >
                  Thích
                </div>
                {replyComment.likes.length > 0 && (
                  <div className="flex gap-1">
                    <Image src="/like.png" width={16} height={16} alt="like" />
                    {replyComment.likes.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListReplyComment;
