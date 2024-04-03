"use client";

import Error from "@/components/layouts/Error";
import { createOrUpdateMark } from "@/lib/actions/marked.action";
import { getChapter } from "@/lib/data/chapter.data";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const SingleChapterPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterNumber: number };
}) => {
  const { novelSlug, chapterNumber } = params;

  const {
    data: chapter,
    message,
    status,
  } = await getChapter(params.novelSlug, params.chapterNumber);

  const handleMark = async () => {
    await createOrUpdateMark(novelSlug, chapterNumber);
  };

  if (status === 200) {
    handleMark();
    return (
      <div className="bg-white shadow-md lg:px-16 p-4 rounded-lg">
        <div className="flex justify-between py-2">
          <Link
            href={`/truyen/${novelSlug}/${chapter.chapterNumber - 1}`}
            className={`flex items-center py-2 px-4 border-2 rounded-full ${
              chapter.chapterNumber === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft />
            Chương trước
          </Link>
          <Link
            href={`/truyen/${novelSlug}/${chapter.chapterNumber + 1}`}
            className={`flex items-center py-2 px-4 border-2 rounded-full ${
              chapter.chapterNumber == chapter.totalChapters
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
          >
            Chương sau <ArrowRight />
          </Link>
        </div>
        <h1 className="text-3xl py-10 text-center">
          Chương {chapter.chapterNumber}: {chapter.chapterName}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: chapter.content,
          }}
        />
      </div>
    );
  } else {
    return <Error message={message} status={status} />;
  }
};

export default SingleChapterPage;
