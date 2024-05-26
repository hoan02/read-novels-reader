import Guide from "@/components/layouts/Guide";
import ListNovel from "@/components/layouts/ListNovel";
import ListReading from "@/components/layouts/ListReading";
import NewChapters from "@/components/novel/NewChapters";
import TopNovels from "@/components/novel/TopNovels";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <div className="lg:flex gap-4">
        <div className="lg:w-3/4">
          <Link
            className="mb-2 flex justify-between text-green-500 font-semibold"
            href="/tim-truyen?rank=thinh-hanh"
          >
            THỊNH HÀNH
            <ChevronsRight />
          </Link>
          <ListNovel />
        </div>
        <div className="lg:w-1/4 space-y-2 mt-4 lg:mt-0">
          <Link
            className="mb-2 flex justify-between text-green-500 font-semibold"
            href="/tai-khoan/tu-truyen"
          >
            ĐANG ĐỌC
            <ChevronsRight />
          </Link>

          <ListReading />
          <Guide />
        </div>
      </div>
      <div className="mt-4">
        <div className="p-2 text-green-500 font-semibold">CHƯƠNG VỪA LÊN</div>
        <NewChapters />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:mt-4">
        <div>
          <Link
            className="p-2 flex justify-between text-green-500 font-semibold"
            href="/tim-truyen?rank=doc-nhieu"
          >
            TOP LƯỢT ĐỌC
            <ChevronsRight />
          </Link>
          <TopNovels searchParams={{ rank: "doc-nhieu", limit: 10 }} />
        </div>
        <div>
          <Link
            className="p-2 flex justify-between text-green-500 font-semibold"
            href="/tim-truyen?rank=de-cu"
          >
            TOP ĐỀ CỬ
            <ChevronsRight />
          </Link>
          <TopNovels searchParams={{ rank: "de-cu", limit: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
