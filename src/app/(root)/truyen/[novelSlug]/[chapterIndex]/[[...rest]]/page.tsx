import { Suspense } from "react";
import Script from "next/script";

import Error from "@/components/layouts/Error";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";
import PageChapterCustom from "@/components/custom-ui/PageChapterCustom";
import getUserInfoServer from "@/utils/getUserInfoServer";
import Comment from "@/components/novel/comment/Comment";
import Loading from "@/app/(root)/loading";

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

  if (status === 429) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAAc37VBmXfbLsHlk"
        ></div>
      </div>
    );
  }

  if (status === 200) {
    if (chapter?.isLock && !premiumState) {
      return (
        <Error
          message={"Chỉ có tài khoản premium mới có quyền đọc chương này!"}
          status={403}
        />
      );
    }
    return (
      <div className="space-y-4">
        <PageChapterCustom novel={novel} chapter={chapter} />
        <Comment novelSlug={novelSlug} />
      </div>
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
