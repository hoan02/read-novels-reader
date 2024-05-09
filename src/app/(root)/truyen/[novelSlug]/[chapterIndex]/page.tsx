import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import Error from "@/components/layouts/Error";
import { createOrUpdateMark } from "@/lib/actions/marked.action";
import { getChapter, getChapters } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";
import Options from "@/components/custom-ui/Options";

const SingleChapterPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  const { userId } = auth();
  const {
    data: chapter,
    message,
    status,
  } = await getChapter(params.novelSlug, params.chapterIndex);
  const { data: novel } = await getNovel(params.novelSlug);
  const { data: chapters } = await getChapters(params.novelSlug);

  if (status === 200) {
    if (userId) await createOrUpdateMark(params.novelSlug, params.chapterIndex);
    return (
      <div className="bg-white shadow-md lg:px-16 p-4 rounded-lg z-0">
        <div className="sticky top-2">
          <Options novel={novel} chapter={chapter} chapters={chapters} />
        </div>
        <h1 className="text-lg py-4 text-center">
          [{novel.novelName}]-{novel.author}
        </h1>
        <h1 className="text-3xl text-center">
          Chương {chapter.chapterIndex}: {chapter.chapterName}
        </h1>
        <div
          className="my-12"
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
