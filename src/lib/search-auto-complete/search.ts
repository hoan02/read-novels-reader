"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import Novel from "../models/novel.model";

export const getNovelSearch = async (input: string) => {
  await connectToDB();
  const agg = [
    {
      $search: {
        index: "search-auto-complete",
        autocomplete: {
          query: input,
          path: "novelName",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 1,
            maxExpansions: 256,
          },
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        novelName: 1,
        novelSlug: 1,
        // urlCover: 1,
        score: { $meta: "searchScore" },
      },
    },
  ];
  const res = await Novel.aggregate(agg);
  const resJson = JSON.parse(JSON.stringify(res));
  return resJson;
};
