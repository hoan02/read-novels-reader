import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { Flag, Glasses, Bookmark } from "lucide-react";
import { getNovel } from "@/lib/data/novel.data";
import { Button } from "@/components/ui/button";
import { getMarked } from "@/lib/data/marked.data";

const SingleNovelPage = async ({
  params,
}: {
  params: { novelSlug: string };
}) => {
  const user = await currentUser();
  let marked, markedMessage, markedStatus;
  const {
    data: novel,
    message: novelMessage,
    status: novelStatus,
  } = await getNovel(params.novelSlug);
  if (user) {
    const resMarked = await getMarked(params.novelSlug);
    marked = resMarked.data;
    markedMessage = resMarked.message;
    markedStatus = resMarked.status;
  }

  if (novelStatus === 200) {
    return (
      <div className="lg:min-w-[1280px] bg-white shadow-md p-4 rounded-xl">
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
              {novel.genres.map((genre) => {
                return (
                  <div key={genre.value} className="border-2 border-blue-800 text-blue-800 px-2 py-1 rounded-full">
                    {genre.label}
                  </div>
                );
              })}
              <div className="border-2 border-green-700 text-green-700 px-2 py-1 rounded-full">
                {novel.state}
              </div>
              <div className="border-2 border-red-700 text-red-700 px-2 py-1 rounded-full">
                {novel.author}
              </div>
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
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.round(novel.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 21l-1.64-7.03L22 9.24l-7.19-.61L10 2 7.19 8.63 0 9.24l5.46 4.73L3.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-4 font-semibold">{novel.rating}/10</span>
              <span className="ml-1">{`(${novel.nominations} đánh giá)`}</span>
            </div>
            {user ? (
              <div className="flex gap-6">
                {marked.chapterIndex === 0 ? (
                  <Link href={`/truyen/${params.novelSlug}/1`}>
                    <Button className="w-[150px] rounded">
                      <Glasses size={30} />
                      Đọc truyện
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href={`/truyen/${params.novelSlug}/${marked.chapterIndex}`}
                  >
                    <Button className="w-[150px] rounded">
                      <Glasses size={30} />
                      Đọc tiếp
                    </Button>
                  </Link>
                )}
                <Button className="w-[150px] rounded">
                  <Bookmark size={30} />
                  Đánh dấu
                </Button>
                <Button className="w-[150px] rounded">
                  <Image src="/candy.png" alt="candy" width={24} height={24} />
                  Đề cử
                </Button>
              </div>
            ) : (
              <Link href={`/truyen/${params.novelSlug}/1`}>
                <Button className="w-[150px] rounded">
                  <Glasses size={30} />
                  Đọc truyện
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/* <div className="mt-10">
        <TabsDetailsNovel novel={novel} />
      </div> */}
      </div>
    );
  }
};

export default SingleNovelPage;
