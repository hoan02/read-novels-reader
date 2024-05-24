"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IconButton } from "@mui/material";

import { createComment } from "@/lib/actions/comment.action";
import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import useUserInfoClient from "@/lib/hooks/useUserInfoClient";
import { X } from "lucide-react";

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
  // const router = useRouter();
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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 text-gray-700 p-2 rounded space-y-2">
        {avatar && <AvatarFrame src={avatar} frame={frameAvatar} />}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between">
            <p className="text-sm font-semibold">{fullName}</p>
            {openReply && setOpenReply && (
              <IconButton size="small" onClick={() => setOpenReply(!openReply)}>
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
  );
};

export default FormComment;
