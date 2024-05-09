"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { getRecentlyReading } from "@/lib/data/reading.data";
import { ErrorType } from "@/types/types";
import Error from "../layouts/Error";

interface NovelDetail {
  urlCover: string;
  novelName: string;
  novelSlug: string;
  chapterIndex: number;
  chapterCount: number;
}

const ListReading = () => {
  const [readNovels, setReadNovels] = useState<NovelDetail[]>([]);
  const [error, setError] = useState<ErrorType>({ message: "", status: null });
  const { isSignedIn } = useUser();

  useEffect(() => {
    const fetchRecentlyReadNovels = async () => {
      try {
        if (isSignedIn) {
          const { data, message, status } = await getRecentlyReading(5);
          if (status === 200) {
            setReadNovels(data);
          } else {
            setError({ message, status });
          }
        }
      } catch (err: any) {
        setError({ message: err.message, status: err.status });
      }
    };

    fetchRecentlyReadNovels();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  if (error.status) {
    return <Error message={error.message} status={error.status} />;
  }
  return (
    <div className="pb-4 border-b-2 border-gray-100">
      <h2 className="mb-4 text-lg font-semibold">Đang đọc</h2>
      <div className="grid grid-cols-1 gap-2">
        {readNovels?.map((novel, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-2 rounded"
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
                {novel.novelName?.length > 28
                  ? `${novel.novelName.substring(0, 28)}...`
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
    </div>
  );
};

export default ListReading;
