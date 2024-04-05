import Link from "next/link";
import Image from "next/image";
import { PencilLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { NovelType } from "@/lib/types";
import { getNovels } from "@/lib/data/novel.data";
import Error from "@/components/layouts/Error";

const ListNovel = async () => {
  const { data: novels, message, status } = await getNovels();

  // if (isLoading) {
  //   return (
  //     <div>
  //       <h2 className="mb-4 text-lg font-semibold">Biên tập viên đề cử</h2>
  //       <div className="grid grid-cols-2 gap-4">
  //         {[...Array(8)].map((_, index) => (
  //           <div
  //             key={index}
  //             className="flex items-center justify-center bg-gray-100 p-4 rounded"
  //           >
  //             <div className="w-24 h-32 bg-gray-300 animate-pulse"></div>
  //             <div className="ml-4">
  //               <div className="w-75 h-6 bg-gray-300 animate-pulse"></div>
  //               <div className="w-75 h-6 bg-gray-300 animate-pulse"></div>
  //               <div className="w-50 h-6 bg-gray-300 animate-pulse"></div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  if (status === 200) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold">Biên tập viên đề cử</h2>
        <div className="grid grid-cols-2 gap-4">
          {novels.map((novel: NovelType, index: number) => (
            <div
              key={index}
              className="flex justify-center bg-gray-100 p-4 rounded"
            >
              <Image
                src={novel.urlCover}
                alt={novel.novelName}
                width={96}
                height={128}
                className="object-cover"
              />
              <div className="ml-4 flex flex-col">
                <Link
                  href={`/truyen/${novel.novelSlug}`}
                  className="text-base font-semibold hover:text-green-500"
                >
                  {novel.novelName.length > 34
                    ? novel.novelName.substring(0, 34) + "..."
                    : novel.novelName}
                </Link>

                <p className="flex-1 text-sm text-gray-500">
                  {novel.description.length > 120
                    ? novel.description.substring(0, 120) + "..."
                    : novel.description}
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-gray-600 flex items-center gap-2">
                    <PencilLine size={14} />
                    {novel.author}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {novel.genres.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre.label}
                      </Badge>
                    ))}
                  </div>
                </div>
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

export default ListNovel;
