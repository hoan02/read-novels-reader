"use client";

import { useState, useEffect } from "react";
import Error from "@/components/layouts/Error";
import { createOrUpdateMark } from "@/lib/actions/marked.action";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChapterType, ErrorType, NovelType } from "@/lib/types";

const SingleChapterPage = ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  const [chapter, setChapter] = useState<ChapterType>();
  const [novel, setNovel] = useState<NovelType>();
  const [error, setError] = useState<ErrorType>({ message: "", status: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: chapterData,
          message,
          status,
        } = await getChapter(params.novelSlug, params.chapterIndex);
        if (status === 200) {
          setChapter(chapterData);
          const { data: novelData } = await getNovel(params.novelSlug);
          setNovel(novelData);
          await createOrUpdateMark(params.novelSlug, params.chapterIndex);
        } else {
          setError({ message, status });
        }
      } catch (err: any) {
        setError({ message: err.message, status: err.status });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.novelSlug, params.chapterIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error.status) {
    return <Error message={error.message} status={error.status} />;
  }

  return (
    chapter && (
      <div className=" bg-white shadow-md lg:px-16 p-4 rounded-lg">
        <div className="flex justify-between py-2">
          <Link
            href={`/truyen/${params.novelSlug}/${chapter.chapterIndex - 1}`}
            className={`flex items-center py-2 px-4 border-2 rounded-full ${
              chapter.chapterIndex === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft />
            Chương trước
          </Link>
          <Link
            href={`/truyen/${params.novelSlug}/${chapter.chapterIndex + 1}`}
            className={`flex items-center py-2 px-4 border-2 rounded-full ${
              chapter.chapterIndex == novel?.chapterCount
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
          >
            Chương sau <ArrowRight />
          </Link>
        </div>
        <h1 className="text-3xl py-10 text-center">
          Chương {chapter.chapterIndex}: {chapter.chapterName}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: chapter.content,
          }}
        />
      </div>
    )
  );
};

export default SingleChapterPage;
