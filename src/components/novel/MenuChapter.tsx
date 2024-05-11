"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownUp } from "lucide-react";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { ChapterType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getChapters } from "@/lib/data/chapter.data";
import { LinearProgress } from "@mui/material";

const MenuChapter = ({ novelSlug }: { novelSlug: string }) => {
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

  if (isLoading) return <LinearProgress />;

  return (
    <div className="p-4 font-source-sans-pro">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Danh sách chương</p>
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
            <Link
              key={index}
              href={`/truyen/${chapter.novelSlug}/${chapter.chapterIndex}`}
              className="text-sm text-gray-600 flex justify-between hover:text-green-600 border-b border-dotted"
            >
              <p>{`Chương ${chapter.chapterIndex}: ${chapter.chapterName}`}</p>
              {chapter.publishedDate && (
                <p>({formatTimeAgo(chapter.publishedDate)})</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuChapter;
