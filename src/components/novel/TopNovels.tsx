import { getNovelsByParams } from "@/lib/data/novel.data";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import Error from "../layouts/Error";
import Image from "next/image";
import { BookUser, Eye, Notebook, Trophy } from "lucide-react";
import Link from "next/link";

const ListTopNovels = async ({ searchParams }: { searchParams: any }) => {
  const {
    data: novels,
    message,
    status,
  } = await getNovelsByParams(searchParams);

  if (status !== 200) {
    return <Error message={message} status={status} />;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-2">
      {novels.map((novel: any, index: number) => {
        if (index === 0) {
          return (
            <div key={index} className="flex gap-2 p-2">
              <div className="mt-1">
                <Image
                  width={20}
                  height={20}
                  src="/rank-index-1.png"
                  alt="rank-index-1.png"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/truyen/${novel.novelSlug}`}
                    className="font-bold hover:text-green-600"
                  >
                    {novel.novelName}
                  </Link>
                  <div className="flex gap-2 font-semibold items-center">
                    <span className="text-gray-500">
                      {searchParams.rank === "doc-nhieu"
                        ? novel.readCount
                        : novel.nominationCount}
                    </span>
                    {searchParams.rank === "doc-nhieu" ? (
                      <Eye className="text-yellow-500" size={20} />
                    ) : (
                      <Trophy className="text-yellow-500" size={16} />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2 text-xs items-center">
                    <Notebook className="text-gray-500" size={20} />
                    {novel.genres.map((genre: any) => {
                      return (
                        <div
                          key={genre.value}
                          className="px-[8px] py-[2px] border-[1px] rounded-full"
                        >
                          {genre.label}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 text-xs items-center">
                    <BookUser className="text-gray-500" size={20} />
                    <span className="px-[8px]">{novel.author}</span>
                  </div>
                </div>
              </div>
              <Link href={`/truyen/${novel.novelSlug}`}>
                <Image
                  width={80}
                  height={120}
                  src={novel.urlCover}
                  alt={`${novel.novelName} cover`}
                />
              </Link>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex gap-2 p-2 text-sm border-t-[1px]">
              <div>
                {index < 3 ? (
                  <Image
                    width={20}
                    height={20}
                    src={`/rank-index-${index + 1}.png`}
                    alt={`/rank-index-${index + 1}`}
                  />
                ) : (
                  <div className="w-[20px] h-[20px] text-center">{index}</div>
                )}
              </div>
              <Link
                href={`/truyen/${novel.novelSlug}`}
                className="hover:text-green-600 flex-1"
              >
                {novel.novelName}
              </Link>
              <div>
                {searchParams.rank === "doc-nhieu"
                  ? novel.readCount
                  : novel.nominationCount}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

const TopNovels = ({ searchParams }: { searchParams: any }) => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <ListTopNovels searchParams={searchParams} />
    </Suspense>
  );
};

export default TopNovels;
