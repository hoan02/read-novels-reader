import { Suspense } from "react";
import type { Metadata } from "next";

import Error from "@/components/layouts/Error";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";
import PageChapterCustom from "@/components/custom-ui/PageChapterCustom";
import getUserInfoServer from "@/utils/getUserInfoServer";
import Loading from "@/app/(root)/loading";

export async function generateMetadata({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}): Promise<Metadata> {
  const novelSlug = params.novelSlug;
  const chapterIndex = Number(params.chapterIndex);
  const [{ data: chapter }, { data: novel }] = await Promise.all([
    getChapter(novelSlug, chapterIndex),
    getNovel(novelSlug),
  ]);

  return {
    title: `${novel.novelName} - Chương ${chapterIndex}: ${chapter.chapterName}`,
  };
}

const Chapter = async ({
  novelSlug,
  chapterIndex,
}: {
  novelSlug: string;
  chapterIndex: number;
}) => {
  const { premiumState } = getUserInfoServer();
  const [{ data: chapter, message, status }, { data: novel }] =
    await Promise.all([
      getChapter(novelSlug, chapterIndex),
      getNovel(novelSlug),
    ]);

  if (status === 200 || status === 429) {
    if (chapter?.isLock && !premiumState) {
      return (
        <Error
          message={"Chỉ có tài khoản premium mới có quyền đọc chương này!"}
          status={403}
        />
      );
    }
    return (
      <PageChapterCustom
        checkBot={status === 429}
        novel={novel}
        chapter={chapter}
      />
    );
  } else {
    return <Error message={message} status={status} />;
  }
};

const SingleChapterPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Chapter
        novelSlug={params.novelSlug}
        chapterIndex={params.chapterIndex}
      />
    </Suspense>
  );
};

export default SingleChapterPage;
