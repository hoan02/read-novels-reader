"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { LinearProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import Error from "@/components/layouts/Error";
import { updateLikeComment } from "@/lib/actions/comment.action";
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
    likeMutation.mutate(commentId);
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Error />;

  return (
    <div className="space-y-2">
      {replyComments?.data?.map((replyComment: any) => (
        <div key={replyComment._id} className="p-2 md:p-4">
          <div className="flex gap-2 lg:gap-4 justify-between">
            <AvatarFrame
              src={replyComment.userInfo?.avatar}
              frame={replyComment.userInfo?.publicMetadata?.frameAvatar}
            />
            <div className="flex flex-col flex-1 gap-2">
              <div className="p-2 bg-slate-100 rounded-lg">
                <div className="text-sm font-bold">
                  {replyComment.userInfo.firstName}{" "}
                  {replyComment.userInfo.lastName}
                </div>
                <div className="mt-2 text-gray-500 text-sm font-mono">
                  {replyComment.message}
                </div>
              </div>
              <div className="flex gap-4 text-xs">
                <p className="">{formatTimeAgo(replyComment.createdAt)}</p>
                <div
                  onClick={() => handleLike(replyComment._id)}
                  className="font-semibold cursor-pointer"
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