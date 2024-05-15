"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { LinearProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getRecentlyBookmark } from "@/lib/data/bookmark.data";
import { deleteBookmark } from "@/lib/actions/bookmark.action";

const ListBookmark = () => {
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();

  const {
    data: bookmarks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      return await getRecentlyBookmark();
    },
    enabled: isSignedIn,
  });

  const handleDeleteBookmark = useMutation({
    mutationFn: (novelSlug: string) => {
      return deleteBookmark(novelSlug);
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

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Error</div>;

  return (
    <div className="pb-4 border-b-2 border-gray-100">
      <div className="grid grid-cols-2 gap-4">
        {bookmarks?.data?.map((novel: any, index: number) => (
          <div key={index} className="flex bg-gray-100 p-2 rounded relative">
            <div
              className="absolute right-1 top-1 p-1 rounded-full cursor-pointer hover:bg-red-50 text-red-500"
              onClick={() => handleDeleteBookmark.mutate(novel.novelSlug)}
            >
              <X />
            </div>
            <Image
              src={novel.urlCover}
              alt={novel.novelName}
              width={48}
              height={64}
              className="object-cover"
            />
            <div className="ml-4 flex flex-col justify-between">
              <p
                className="font-semibold hover:text-green-500
                cursor-pointer"
              >
                <Link href={`/truyen/${novel.novelSlug}`}>
                  {novel.novelName?.length > 28
                    ? `${novel.novelName.substring(0, 28)}...`
                    : novel.novelName}
                </Link>
              </p>
              <div>
                <p className="text-sm">Số chương: {novel.chapterCount}</p>
                <p className="text-sm">Tác giả: {novel.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBookmark;
