"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import { Rating, Chip, Button, Skeleton, LinearProgress } from "@mui/material";
import { FaFlag } from "react-icons/fa";
import { PiSunglassesFill } from "react-icons/pi";
import { HiOutlineBookmark } from "react-icons/hi";
import TabsDetailsNovel from "@/components/novel/details/TabsDetailsNovel";

const SingleNovelPage = () => {
  const { novelSlug } = useParams();

  const { data: novel, isLoading: novelLoading } = useQuery({
    queryKey: ["novel", `${novelSlug}`],
    queryFn: () => fetch(`/api/novels/${novelSlug}`).then((res) => res.json()),
  });

  const { data: markedData, isSuccess: markedSuccess } = useQuery({
    queryKey: [`"marked", ${novelSlug}`],
    queryFn: () => fetch(`/api/marked/${novelSlug}`).then((res) => res.json()),
  });

  if (novelLoading)
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

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <div className="flex gap-4">
        <div className="w-[240-px] h-[320px]">
          <CldImage
            alt={novel.name}
            src={novel.urlCover}
            crop="fill"
            width={240}
            height={320}
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 mx-4">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-semibold text-green-800">
              {novel.name}
            </h1>
            <FaFlag />
          </div>
          <div className="flex gap-2 items-center my-6">
            <Chip
              label={novel.type}
              variant="outlined"
              style={{ color: "#0000AA", borderColor: "#0000AA" }}
            />
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
              <p className="font-bold">{novel.numberOfChapter}</p>
              <p>Chương</p>
            </div>

            <div>
              <p className="font-bold">{novel.reads}</p>
              <p>Lượt đọc</p>
            </div>
            <div>
              <p className="font-bold">123</p>
              <p>Đề cử</p>
            </div>
          </div>
          <div className="my-4 flex items-center text-sm">
            <Rating
              precision={0.5}
              defaultValue={novel.rating}
              max={10}
              readOnly
            />
            <span className="ml-4 font-semibold">{novel.rating}/10</span>
            <span className="ml-1">{`(${novel.nominations} đánh giá)`}</span>
          </div>
          {markedSuccess && (
            <div className="flex gap-6">
              {markedData.chapterNumber === 0 ? (
                <Link href={`/truyen/${novelSlug}/1`}>
                  <Button
                    variant="contained"
                    style={{
                      width: "150px",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    startIcon={<PiSunglassesFill size={30} />}
                  >
                    Đọc truyện
                  </Button>
                </Link>
              ) : (
                <Link href={`/truyen/${novelSlug}/${markedData.chapterNumber}`}>
                  <Button
                    variant="contained"
                    style={{
                      width: "150px",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    startIcon={<PiSunglassesFill size={30} />}
                  >
                    Đọc tiếp
                  </Button>
                </Link>
              )}
              <Button
                variant="outlined"
                style={{
                  width: "150px",
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
                startIcon={<HiOutlineBookmark size={24} />}
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
          )}
        </div>
      </div>
      <div className="mt-10">
        <TabsDetailsNovel novel={novel} />
      </div>
    </div>
  );
};

export default SingleNovelPage;
