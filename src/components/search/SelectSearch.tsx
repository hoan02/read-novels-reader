"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { novelGenres, novelRanks } from "@/lib/constants";

const SelectSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name === "rank") {
        if (params.get(name) === value) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      } else {
        let existingValues = params.getAll(name);
        if (existingValues.includes(value)) {
          existingValues = existingValues.filter((val) => val !== value);
        } else {
          existingValues.push(value);
        }
        params.delete(name);
        existingValues.forEach((val) => params.append(name, val));
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-semibold">Thể loại:</div>
        <div className="flex text-xs gap-4">
          {novelGenres.map((genre) => {
            const isActive = searchParams.getAll("type").includes(genre.slug);
            return (
              <div
                className={`px-4 py-2 cursor-pointer rounded-full border-[1px] border-green-500 ${
                  isActive ? "bg-green-500 text-white" : ""
                }`}
                key={genre.slug}
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("type", genre.slug)
                  );
                }}
              >
                {genre.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">Xếp hạng:</div>
        <div className="flex text-xs gap-4">
          {novelRanks.map((rank) => {
            const isActive = searchParams.getAll("rank").includes(rank.slug);
            return (
              <div
                className={`px-4 py-2 cursor-pointer rounded-full border-[1px] border-green-500 ${
                  isActive ? "bg-green-500 text-white" : ""
                }`}
                key={rank.slug}
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("rank", rank.slug)
                  );
                }}
              >
                {rank.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectSearch;
