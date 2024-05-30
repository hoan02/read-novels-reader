import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getNewChapters } from "@/lib/data/chapter.data";
import Error from "../layouts/Error";
import { ChapterWithNovelType } from "@/types/types";
import formatTimeAgo from "@/utils/formatTimeAgo";
import Link from "next/link";

const ListNewChapters = async () => {
  const { data: newChapters, message, status } = await getNewChapters(10);

  if (status !== 200) {
    <Error message={message} status={status} />;
  }
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      {newChapters?.map((chapter: ChapterWithNovelType) => {
        return (
          <div
            className="flex gap-4 w-full border-b-[1px] p-2 text-sm text-gray-500"
            key={chapter._id}
          >
            <Link
              href={`/truyen/${chapter.novelSlug}/${chapter.chapterIndex}`}
              className="flex flex-1 hover:text-green-500"
            >
              <div className="w-[100px]">
                Chương: {chapter.chapterIndex}
              </div>
              {chapter.chapterName}
            </Link>
            <div className="flex items-center">
              <Link
                href={`/truyen/${chapter.novelSlug}`}
                className="text-xs hidden lg:block w-[300px]"
              >
                {chapter.novelInfo.novelName}
              </Link>
            </div>
            <div className="flex items-center">
              <div className="text-xs hidden lg:block w-[100px]">
                {formatTimeAgo(chapter.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const NewChapters = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <ListNewChapters />
    </Suspense>
  );
};

export default NewChapters;
