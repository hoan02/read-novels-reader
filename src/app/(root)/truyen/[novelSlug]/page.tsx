import Link from "next/link";
import Image from "next/image";
import { Flag, Glasses, Bookmark } from "lucide-react";

import { Button, Chip, Rating, LinearProgress, Skeleton } from "@mui/material";
import TabsDetailsNovel from "@/components/novel/TabsDetailsNovel";
import { getNovel } from "@/lib/data/novel.data";
import Error from "@/components/layouts/Error";
import { getMarked } from "@/lib/data/bookmark.data";
import { NovelType } from "@/types/types";
import { Suspense } from "react";
import { getChapters } from "@/lib/data/chapter.data";

const Loading = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <div className="flex gap-4 mb-4">
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

const MarkedHandler = async ({ novelSlug }: { novelSlug: string }) => {
  const { data: marked, message, status } = await getMarked(novelSlug);
  if (status === 401) {
    return (
      <Button
        variant="contained"
        style={{
          width: "150px",
          borderRadius: "30px",
          textTransform: "none",
          fontSize: "16px",
        }}
        startIcon={<Glasses size={30} />}
      >
        <Link href={`/truyen/${novelSlug}/1`}>Đọc truyện</Link>
      </Button>
    );
  }

  if (status === 200) {
    return (
      <div className="flex gap-6">
        {marked.chapterIndex === 0 ? (
          <Button
            variant="contained"
            style={{
              width: "150px",
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "16px",
            }}
            startIcon={<Glasses size={30} />}
          >
            <Link href={`/truyen/${novelSlug}/1`}>Đọc truyện</Link>
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              width: "150px",
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "16px",
            }}
            startIcon={<Glasses size={30} />}
          >
            <Link href={`/truyen/${novelSlug}/${marked.chapterIndex}`}>
              Đọc tiếp
            </Link>
          </Button>
        )}
        <Button
          variant="outlined"
          style={{
            width: "150px",
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "16px",
          }}
          startIcon={<Bookmark size={24} />}
        >
          Đánh dấu
        </Button>
        <Button
          variant="outlined"
          style={{
            width: "150px",
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "16px",
          }}
          startIcon={
            <Image src="/candy.png" alt="candy" width={24} height={24} />
          }
        >
          Đề cử
        </Button>
      </div>
    );
  }
};

const NovelDetails = async ({ novelSlug }: { novelSlug: string }) => {
  const {
    data: novel,
    message,
    status,
  }: { data: NovelType; message: string; status: number } = await getNovel(
    novelSlug
  );

  const { data: chapters } = await getChapters(novelSlug);

  if (status !== 200) {
    return <Error message={message} status={status} />;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <div className="flex gap-4">
        <div className="w-[240-px] h-[320px]">
          <Image
            alt={novel.novelName}
            src={novel.urlCover}
            width={240}
            height={320}
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 mx-4">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-semibold text-green-800">
              {novel.novelName}
            </h1>
            <Flag />
          </div>
          <div className="flex gap-2 items-center my-6">
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
            <Chip
              label={novel.author}
              variant="outlined"
              style={{ color: "#990000", borderColor: "#990000" }}
            />
          </div>
          <div className="flex gap-6 my-6">
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
              precision={0.5}
              defaultValue={novel.reviews.avgScore}
              max={10}
              readOnly
            />
            <span className="ml-4 font-semibold">
              {novel.reviews.avgScore}/10
            </span>
            <span className="ml-1">{`(${novel.reviews.count} đánh giá)`}</span>
          </div>
          <MarkedHandler novelSlug={novelSlug} />
        </div>
      </div>
      <div className="mt-10">
        <TabsDetailsNovel novel={novel} chapters={chapters} />
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
