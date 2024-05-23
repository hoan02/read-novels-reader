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

const ListComment = ({ novelSlug }: { novelSlug: string }) => {
  const queryClient = useQueryClient();
  const [openReply, setOpenReply] = useState<Record<string, boolean>>({});

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`comments-${novelSlug}`],
    queryFn: () => getComments(novelSlug),
    enabled: !!novelSlug,
  });

  const likeMutation = useMutation({
    mutationFn: (commentId: string) => updateLikeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comments-${novelSlug}`] });
    },
    onError: (error) => {
      console.error("Error submitting comment:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleLike = (commentId: string) => {
    likeMutation.mutate(commentId);
  };

  const toggleReply = (commentId: string) => {
    setOpenReply((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Error />;

  return (
    <div className="rounded-lg w-full mt-4 text-gray-700">
      <div className="mb-2 ml-2 font-semibold">Tất cả bình luận:</div>

      <div className="space-y-2">
        {comments?.data?.map((comment: any) => (
          <div key={comment._id} className="p-2 md:p-4">
            <div className="flex gap-2 lg:gap-4 justify-between">
              <AvatarFrame
                src={comment.userInfo?.avatar}
                frame={comment.userInfo?.publicMetadata?.frameAvatar}
              />
              <div className="flex flex-col flex-1 gap-2">
                <div className="p-2 bg-slate-100 rounded-lg">
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
                    className="font-semibold cursor-pointer"
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
                <ListReplyComment
                  novelSlug={novelSlug}
                  parentId={comment._id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
