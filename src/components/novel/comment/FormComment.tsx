"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IconButton } from "@mui/material";

import { createComment } from "@/lib/actions/comment.action";
import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import useUserInfoClient from "@/lib/hooks/useUserInfoClient";
import { X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

interface CommentDataType {
  novelSlug: string;
  message: string;
  parentId?: string | null;
}

const FormComment = ({
  novelSlug,
  parentId = null,
  openReply,
  setOpenReply,
}: {
  novelSlug: string;
  parentId?: string | null;
  openReply?: boolean;
  setOpenReply?: (openReply: boolean) => void;
}) => {
  const { isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  const { fullName, avatar, frameAvatar } = useUserInfoClient();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const createCommentMutation = useMutation({
    mutationFn: (formData: CommentDataType) => createComment(formData),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: parentId ? [`replies-${parentId}`] : [`comment-${novelSlug}`],
      });
    },
    onError: (error) => {
      console.error("Error submitting comment:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này!");
      return;
    }

    const formData = {
      novelSlug,
      message,
      parentId,
    };
    createCommentMutation.mutate(formData);
    setMessage("");
    if (openReply && setOpenReply) setOpenReply(!openReply);
  };

  return (
    <div>
      {isSignedIn ? (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 text-gray-700 p-2 rounded space-y-2">
            {avatar && <AvatarFrame src={avatar} frame={frameAvatar} />}
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between">
                <p className="text-sm font-semibold">{fullName}</p>
                {openReply && setOpenReply && (
                  <IconButton
                    size="small"
                    onClick={() => setOpenReply(!openReply)}
                  >
                    <X />
                  </IconButton>
                )}
              </div>
              <div className="flex flex-1 gap-2">
                <textarea
                  className="p-1 w-full active:outline-none focus:outline-none rounded border-[1px] overflow-hidden"
                  value={message}
                  onChange={handleChange}
                  rows={2}
                  ref={textAreaRef}
                />
                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="text-white text-sm px-2 h-8 bg-green-500 rounded"
                  >
                    Đăng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full h-10">
          Hãy đăng nhập để được bình luận!{" "}
          <Link href={`/sign-in`} className="text-blue-500">
            Đăng nhập ngay
          </Link>
        </div>
      )}
    </div>
  );
};

export default FormComment;
