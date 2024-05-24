"use client";

import Image from "next/image";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Error from "@/components/layouts/Error";
import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import { getComments } from "@/lib/data/comment.data";
import formatTimeAgo from "@/utils/formatTimeAgo";
import toast from "react-hot-toast";
import { updateLikeComment } from "@/lib/actions/comment.action";
import FormComment from "./FormComment";
import ListReplyComment from "./ListReplyComment";
import { ArrowDownUp } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const ListComment = ({ novelSlug }: { novelSlug: string }) => {
  const queryClient = useQueryClient();
  const { isSignedIn, userId } = useAuth();
  const [openReply, setOpenReply] = useState<Record<string, boolean>>({});
  const [ascending, setAscending] = useState(true);

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`comment-${novelSlug}`],
    queryFn: () => getComments(novelSlug),
    enabled: !!novelSlug,
  });

  const likeMutation = useMutation({
    mutationFn: (commentId: string) => updateLikeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comment-${novelSlug}`],
      });
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

  const toggleReply = (commentId: string) => {
    setOpenReply((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleSortToggle = () => {
    setAscending((prevAscending) => !prevAscending);
  };

  const sortedComments = ascending
    ? comments?.data
    : comments?.data.slice().reverse();

  if (isLoading) return <LinearProgress />;
  if (isError) return <Error />;

  return (
    <div className="rounded-lg w-full mt-4 text-gray-700">
      <div className="flex justify-between">
        <div className="mb-2 font-semibold">Tất cả bình luận:</div>
        <div className="flex gap-2 items-center">
          <p className="text-xs bg-sky-100 px-2 py-1">
            {ascending ? "cũ nhất" : "mới nhất"}
          </p>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleSortToggle}
          >
            <ArrowDownUp />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedComments?.map((comment: any) => (
          <div key={comment._id}>
            <div className="flex gap-2 lg:gap-4">
              <div className="min-w-[40px] lg:min-w-[60px]">
                <AvatarFrame
                  className="w-[40px] lg:w-[60px]"
                  src={comment.userInfo?.avatar}
                  frame={comment.userInfo?.publicMetadata?.frameAvatar}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="max-w-max min-w-[220px] p-2 bg-slate-50 rounded-lg">
                  <div className="text-sm font-bold">
                    {comment.userInfo.firstName} {comment.userInfo.lastName}
                  </div>
                  <div className="mt-2 text-gray-500 text-sm font-mono">
                    {comment.message}
                  </div>
                </div>
                <div className="flex gap-4 text-xs">
                  <p className="">{formatTimeAgo(comment.createdAt)}</p>
                  <div
                    onClick={() => handleLike(comment._id)}
                    className={`font-semibold cursor-pointer ${
                      comment.likes.includes(userId)
                        ? "text-sky-500"
                        : "text-gray-700"
                    }`}
                  >
                    Thích
                  </div>
                  <div
                    onClick={() => toggleReply(comment._id)}
                    className="font-semibold cursor-pointer"
                  >
                    Trả lời
                  </div>
                  {comment.likes.length > 0 && (
                    <div className="flex gap-1">
                      <Image
                        src="/like.png"
                        width={16}
                        height={16}
                        alt="like"
                      />
                      {comment.likes.length}
                    </div>
                  )}
                </div>
                {openReply[comment._id] && (
                  <FormComment
                    novelSlug={novelSlug}
                    parentId={comment._id}
                    openReply={openReply[comment._id]}
                    setOpenReply={() => toggleReply(comment._id)}
                  />
                )}
              </div>
            </div>
            <div className="ml-[20px] lg:ml-[28px] border-l-2 lg:border-l-4">
              <ListReplyComment novelSlug={novelSlug} parentId={comment._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
