import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { PencilLine } from "lucide-react";
import { Chip, Skeleton } from "@mui/material";

import { NovelType } from "@/types/types";
import Error from "@/components/layouts/Error";
import { getNovels, getNovelsByParams } from "@/lib/data/novel.data";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[...Array(8)].map((_, index: number) => (
        <div
          key={index}
          className="flex items-center justify-center bg-gray-50 p-4 rounded"
        >
          <Skeleton variant="rectangular" width={108} height={144} />
          <div className="ml-4">
            <Skeleton width={300} height={25} />
            <Skeleton width={300} height={25} />
            <Skeleton width={200} height={25} />
          </div>
        </div>
      ))}
    </div>
  );
};

const NovelGrid = async () => {
  const {
    data: novels,
    message,
    status,
  } = await getNovelsByParams({
    rank: "thinh-hanh",
    limit: 8,
  });

  if (status === 200) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {novels.slice(0, 8).map((novel: NovelType, index: number) => (
          <div key={index} className="flex bg-gray-50 p-4 rounded">
            <Image
              src={novel.urlCover}
              alt={novel.novelName}
              width={96}
              height={144}
              style={{ width: "auto", height: "144px" }}
            />

            <div className="ml-4 flex flex-col">
              <Link
                href={`/truyen/${novel.novelSlug}`}
                className="text-base font-semibold hover:text-green-500"
              >
                {novel.novelName.length > 30
                  ? novel.novelName.substring(0, 30) + "..."
                  : novel.novelName}
              </Link>

              <p className="mt-1 flex-1 text-sm text-gray-500">
                <span
                  dangerouslySetInnerHTML={{
                    __html: novel.shortDescription?.substring(0, 120) || "",
                  }}
                />
              </p>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <PencilLine size={14} />
                  {novel.author}
                </div>
                <div className="flex flex-wrap gap-2">
                  {novel.genres.slice(0, 3).map((genre: any, index: number) => (
                    <Chip
                      key={index}
                      label={genre.label}
                      variant="outlined"
                      size="small"
                      style={{ color: "#8B4513" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <Error message={message} status={status} />;
};

const ListNovel = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <NovelGrid />
    </Suspense>
  );
};

export default ListNovel;
