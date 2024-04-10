"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LinearProgress } from "@mui/material";
import { ArrowDownUp } from "lucide-react";
import formatTimeAgo from "@/utils/formatTimeAgo";
import { ChapterType } from "@/lib/types";
import { getChapters } from "@/lib/data/chapter.data";

const MenuChapter = () => {
  const { novelSlug }: { novelSlug: string } = useParams();
  const [ascending, setAscending] = useState(true);

  const {
    data: chapters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`chapter-${novelSlug}`],
    queryFn: () => getChapters(novelSlug).then((res) => res.data),
  });

  const sortedChapters = ascending ? chapters : chapters.slice().reverse();

  const handleSortToggle = () => {
    setAscending((prevAscending) => !prevAscending);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <div>Chapters not found</div>;
  }

  return (
    <div className="p-4 font-source-sans-pro">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">Danh sách chương</p>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={handleSortToggle}
        >
          <ArrowDownUp />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
        {sortedChapters?.map((chapter: ChapterType, index: number) => {
          return (
            <Link
              key={index}
              href={`/truyen/${novelSlug}/${chapter.chapterIndex}`}
              className="text-sm text-gray-00 flex justify-between hover:text-green-600 border-b border-dotted"
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
