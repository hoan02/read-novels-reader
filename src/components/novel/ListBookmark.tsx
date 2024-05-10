"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { LinearProgress } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { getRecentlyBookmark } from "@/lib/data/bookmark.data";

const ListBookmark = () => {
  const { isSignedIn } = useUser();

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

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Error</div>;

  return (
    <div className="pb-4 border-b-2 border-gray-100">
      <h2 className="mb-4 text-lg font-semibold">Đang đọc</h2>
      <div className="grid grid-cols-2 gap-4">
        {bookmarks?.data?.map((novel: any, index: number) => (
          <Link key={index} href={`/truyen/${novel.novelSlug}`}>
            <div className="flex bg-gray-100 p-2 rounded">
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
                  {novel.novelName?.length > 28
                    ? `${novel.novelName.substring(0, 28)}...`
                    : novel.novelName}
                </p>
                <div>
                  <p className="text-sm">Số chương: {novel.chapterCount}</p>
                  <p className="text-sm">Tác giả: {novel.author}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListBookmark;
