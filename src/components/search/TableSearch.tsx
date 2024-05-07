import { getNovelsByParams } from "@/lib/data/novel.data";
import { NovelType } from "@/lib/types";
import React from "react";
import Error from "../layouts/Error";
import Image from "next/image";
import Link from "next/link";
import { PencilLine } from "lucide-react";
import { Chip } from "@mui/material";

const TableSearch = async ({ searchParams }: { searchParams: any }) => {
  const {
    data: novels,
    message,
    status,
  } = await getNovelsByParams(searchParams);
  if (status === 200) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {novels.map((novel: NovelType, index: number) => (
          <div
            key={index}
            className="flex justify-center bg-gray-100 p-4 rounded"
          >
            <Image
              src={novel.urlCover}
              alt={novel.novelName}
              width={108}
              height={144}
              style={{ width: "108px", height: "144px" }}
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
                {novel.description.length > 100
                  ? novel.description.substring(0, 100) + "..."
                  : novel.description}
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

export default TableSearch;
