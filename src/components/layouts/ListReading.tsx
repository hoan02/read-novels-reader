"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { LinearProgress } from "@mui/material";

import { getRecentlyReading } from "@/lib/data/reading.data";

interface NovelDetail {
  urlCover: string;
  novelName: string;
  novelSlug: string;
  chapterIndex: number;
  chapterCount: number;
}

const ListReading = () => {
  const { isLoaded, userId } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["reading"],
    queryFn: async () => {
      return await getRecentlyReading(5);
    },
    enabled: isLoaded,
  });

  if (isLoading && isLoaded) {
    return <LinearProgress />;
  }

  if (!userId) {
    return null;
  }

  if (data?.status === 200) {
    return (
      <div className="pb-4 border-b-2 border-gray-100 grid grid-cols-1 gap-2">
        {data?.data?.map((novel: NovelDetail, index: number) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-2 rounded"
          >
            <Image
              src={novel.urlCover}
              alt={novel.novelName}
              width={48}
              height={64}
              className="object-cover"
            />
            <div className="ml-4 flex-grow">
              <Link
                href={`/truyen/${novel.novelSlug}`}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                {novel.novelName?.length > 50
                  ? `${novel.novelName.substring(0, 50)}...`
                  : novel.novelName}
              </Link>
              <p className="mt-2 text-sm text-gray-600 flex justify-between">
                Đang đọc: {novel.chapterIndex}/{novel.chapterCount}
                <Link
                  href={`/truyen/${novel.novelSlug}/${novel.chapterIndex}`}
                  className="text-xs text-red-600 hover:text-green-500 cursor-pointer ml-2"
                >
                  Đọc tiếp
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default ListReading;
