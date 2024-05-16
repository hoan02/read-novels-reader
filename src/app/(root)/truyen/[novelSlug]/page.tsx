import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Flag } from "lucide-react";
import {
  Chip,
  Rating,
  LinearProgress,
  Skeleton,
  IconButton,
} from "@mui/material";

import Error from "@/components/layouts/Error";
import TabsDetailsNovel from "@/components/novel/TabsDetailsNovel";
import { getNovel } from "@/lib/data/novel.data";
import ReadingButton from "@/components/custom-ui/ReadingButton";
import BookmarkButton from "@/components/custom-ui/BookmarkButton";
import NominationButton from "@/components/custom-ui/NominationButton";

const Loading = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <div className="hidden lg:flex gap-4 mb-4">
        <Skeleton variant="rectangular" width={240} height={320} />
        <div className="space-y-4">
          <Skeleton variant="rounded" width={600} height={50} />
          <Skeleton variant="rounded" width={600} height={50} />
          <Skeleton variant="rounded" width={600} height={50} />
        </div>
      </div>
      <LinearProgress />
    </div>
  );
};

const NovelDetails = async ({ novelSlug }: { novelSlug: string }) => {
  const { data: novel, message, status } = await getNovel(novelSlug);

  if (status !== 200) {
    return <Error message={message} status={status} />;
  }

  return (
    <div className="bg-white shadow-md p-2 lg:p-4 rounded-xl">
      <div className="md:flex flex-cols-1 gap-4">
        <Image
          className="mx-auto mb-2"
          alt={novel.novelName}
          src={novel.urlCover}
          width={240}
          height={320}
          style={{ objectFit: "contain" }}
        />
        <div className="sm:flex-1 lg:ml-4">
          <div className="flex justify-between gap-2 items-center">
            <h1 className="text-2xl font-semibold text-green-800">
              {novel.novelName}
            </h1>
            <Link href="/tai-khoan/ho-tro">
              <IconButton>
                <Flag />
              </IconButton>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 lg:gap-4 items-center my-4 lg:my-6">
            {novel.genres.map((genre: any) => {
              return (
                <Chip
                  key={genre.label}
                  label={genre.label}
                  variant="outlined"
                />
              );
            })}

            <Chip
              label={novel.state}
              variant="outlined"
              style={{ color: "#009900", borderColor: "#009900" }}
            />
          </div>
          <div className="my-4 text-sm">Tác giả: {novel.author}</div>
          <div className="flex gap-6 my-4 lg:my-6">
            <div>
              <p className="font-bold">{novel.chapterCount}</p>
              <p>Chương</p>
            </div>

            <div>
              <p className="font-bold">{novel.readCount}</p>
              <p>Lượt đọc</p>
            </div>
            <div>
              <p className="font-bold">{novel.nominationCount}</p>
              <p>Đề cử</p>
            </div>
          </div>
          <div className="my-4 flex items-center text-sm">
            <Rating
              size="small"
              precision={0.5}
              defaultValue={novel.reviews.avgScore}
              max={10}
              readOnly
            />
            <span className="ml-2 font-semibold">
              {novel.reviews.avgScore}/10
            </span>
            <span className="ml-1">{`(${novel.reviews.count} đánh giá)`}</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <ReadingButton novelSlug={novelSlug} />
            <div className="flex gap-4 w-full lg:w-[352px]">
              <BookmarkButton novelSlug={novelSlug} />
              <NominationButton novelSlug={novelSlug} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <TabsDetailsNovel novel={novel} />
      </div>
    </div>
  );
};

const SingleNovelPage = ({ params }: { params: { novelSlug: string } }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <NovelDetails novelSlug={params.novelSlug} />
      </Suspense>
    </div>
  );
};

export default SingleNovelPage;
