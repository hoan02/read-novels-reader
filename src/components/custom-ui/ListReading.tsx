import { NovelType } from "@/lib/types";
import Image from "next/image";
import Error from "../layouts/Error";
import { getRecentlyReadNovels } from "@/lib/data/marked.data";

const ListReading = async () => {
  const { data: readNovel, message, status } = await getRecentlyReadNovels(5);
  console.log(readNovel);
  if (status === 200) {
    return (
      <div className="pb-4 border-b-2 border-gray-100">
        <h2 className="mb-4 text-lg font-semibold">Đang đọc</h2>
        <div className="grid grid-cols-1 gap-2">
          {readNovel.map((novel: NovelType, index: number) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 p-2 rounded"
            >
              <Image
                src={novel.urlCover}
                alt={novel.novelName}
                width={48}
                height={64}
                className="object-cover "
              />
              <div className="ml-4 flex-grow">
                <p className="text-sm font-semibold hover:text-green-500 cursor-pointer">
                  {novel.novelName?.length > 28
                    ? novel.novelName.substring(0, 28) + "..."
                    : novel.novelName}
                </p>
                <p className="mt-2 text-sm text-gray-600 flex justify-between">
                  Đã đọc: {novel.readCount}/{novel.chapterCount}
                  <p className="text-xs text-red-600 hover:text-green-500 cursor-pointer ml-2">
                    Đọc tiếp
                  </p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <Error message={message} status={status} />;
  }
};

export default ListReading;
