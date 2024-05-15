"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp, BookKey, BookLock } from "lucide-react";
import { LinearProgress } from "@mui/material";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { ChapterType } from "@/types/types";
import { getChapters } from "@/lib/data/chapter.data";
import toast from "react-hot-toast";
import useUserInfoClient from "@/lib/hooks/useUserInfoClient";

const MenuChapter = ({ novelSlug }: { novelSlug: string }) => {
  const route = useRouter();
  const { premiumState } = useUserInfoClient();
  const [ascending, setAscending] = useState(true);

  const { data: chapters, isLoading } = useQuery({
    queryKey: [`chapters-${novelSlug}`],
    queryFn: async () => {
      const res = await getChapters(novelSlug);
      return res.data;
    },
    enabled: !!novelSlug,
  });

  const sortedChapters = ascending ? chapters : chapters.slice().reverse();

  const handleSortToggle = () => {
    setAscending((prevAscending) => !prevAscending);
  };

  const handleGotoChapter = (chapter: ChapterType) => {
    if (chapter.isLock && !premiumState) {
      toast.error(
        "Bạn cần nâng tài khoản lên premium để có thể đọc chương bị khóa!"
      );
      return;
    }
    route.push(`/truyen/${chapter.novelSlug}/${chapter.chapterIndex}`);
  };

  if (isLoading) return <LinearProgress />;

  return (
    <div className="p-4 font-source-sans-pro">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Danh sÃ¡ch chÆ°Æ¡ng</p>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={handleSortToggle}
        >
          <ArrowDownUp />
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-12 gap-y-4">
        {sortedChapters?.map((chapter: ChapterType, index: number) => {
          return (
            <div
              key={index}
              onClick={() => handleGotoChapter(chapter)}
              className="text-sm text-gray-600 flex justify-between hover:text-sky-500 border-b border-dotted cursor-pointer"
            >
              <p>{`Chương ${chapter.chapterIndex}: ${chapter.chapterName}`}</p>
              {chapter.publishedDate && (
                <p>({formatTimeAgo(chapter.publishedDate)})</p>
              )}
              {chapter.isLock &&
                (premiumState ? (
                  <BookKey size={18} className="text-green-500" />
                ) : (
                  <BookLock size={18} className="text-red-500" />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuChapter;
