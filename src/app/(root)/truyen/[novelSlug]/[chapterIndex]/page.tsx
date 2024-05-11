import { auth } from "@clerk/nextjs/server";

import Error from "@/components/layouts/Error";
import { createOrUpdateReading } from "@/lib/actions/reading.action";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";
import PageChapterCustom from "@/components/custom-ui/PageChapterCustom";

const SingleChapterPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  const { userId } = auth();
  const [{ data: chapter, message, status }, { data: novel }] =
    await Promise.all([
      getChapter(params.novelSlug, params.chapterIndex),
      getNovel(params.novelSlug),
    ]);

  if (status === 200) {
    if (userId)
      await createOrUpdateReading(params.novelSlug, params.chapterIndex);
    return <PageChapterCustom novel={novel} chapter={chapter} />;
  } else {
    return <Error message={message} status={status} />;
  }
};

export default SingleChapterPage;
