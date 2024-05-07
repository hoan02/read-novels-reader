import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import Error from "@/components/layouts/Error";
import { createOrUpdateMark } from "@/lib/actions/marked.action";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";

const SingleChapterPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  const {
    data: chapter,
    message,
    status,
  } = await getChapter(params.novelSlug, params.chapterIndex);
  const { userId } = auth();
  const { data: novel } = await getNovel(params.novelSlug);

  if (status === 200) {
    if (userId) await createOrUpdateMark(params.novelSlug, params.chapterIndex);
    return (
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
              chapter.chapterIndex == novel.chapterCount
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
    );
  } else {
    return <Error message={message} status={status} />;
  }
};

export default SingleChapterPage;
