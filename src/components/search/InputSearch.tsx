"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { NovelType } from "@/types/types";
import { getNovelSearch } from "@/lib/actions/search.action";

const InputSearch = () => {
  const [value, setValue] = useState("");
  const [novels, setNovels] = useState<NovelType[]>([]);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const getData = async (debouncedValue: string) => {
    let data = await getNovelSearch(debouncedValue);
    setNovels(data);
  };

  useEffect(() => {
    if (debouncedValue) {
      getData(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="flex-1 relative max-w-md">
      <input
        className="w-full px-5 py-2 rounded-full border-none focus:outline-green-500 font-normal text-sm"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tìm truyện..."
      />
      <Search
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer opacity-40"
        size={24}
      />
      {novels.length > 0 && value && (
        <div className="absolute z-50 bg-white w-full mt-3 p-2 rounded-lg text-sm">
          {novels?.map((novel: any, index: number) => (
            <Link
              key={index}
              onClick={() => setValue("")}
              href={`/truyen/${novel.novelSlug}`}
              className="block p-2 cursor-pointer hover:bg-slate-50"
            >
              {novel.novelName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
