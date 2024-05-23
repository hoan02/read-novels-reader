"use server";

import { SortOrder } from "mongoose";
import connectToDB from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import createResponse from "@/utils/createResponse";

interface SearchParams {
  rank?: string;
  type?: string | string[];
  limit?: number;
}

export const getNovel = async (novelSlug: string) => {
  try {
    await connectToDB();
    const novel = await Novel.findOne({
      novelSlug,
      isPublic: true,
    });

    if (!novel) {
      return createResponse(null, "Không tìm thấy truyện!", 404);
    }

    return createResponse(novel, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getNovels = async () => {
  try {
    await connectToDB();
    const novels = await Novel.find({ isPublic: true });
    return createResponse(novels, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getNovelsByParams = async (searchParams: SearchParams) => {
  try {
    await connectToDB();

    const query: any = {
      isPublic: true,
      ...(searchParams.type && {
        "genres.value": {
          $in: Array.isArray(searchParams.type)
            ? searchParams.type
            : [searchParams.type],
        },
      }),
    };

    const sortCriteria: { [key: string]: SortOrder } = {};
    switch (searchParams.rank) {
      case "doc-nhieu":
        sortCriteria.readCount = -1;
        break;
      case "de-cu":
        sortCriteria.nominationCount = -1;
        break;
      case "thao-luan":
        sortCriteria.commentCount = -1;
        break;
      case "thinh-hanh":
        sortCriteria["compositeScore"] = -1;
        break;
      default:
        break;
    }

    let novelsQuery;
    if (searchParams.rank === "thinh-hanh") {
      const maxValues = await Novel.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            maxReadCount: { $max: "$readCount" },
            maxNominationCount: { $max: "$nominationCount" },
            maxCommentCount: { $max: "$commentCount" },
          },
        },
      ]).exec();

      const { maxReadCount, maxNominationCount, maxCommentCount } =
        maxValues[0];

      novelsQuery = Novel.aggregate([
        { $match: query },
        {
          $addFields: {
            normalizedReadCount: {
              $cond: [
                { $eq: [maxReadCount, 0] },
                1,
                { $divide: ["$readCount", maxReadCount] },
              ],
            },
            normalizedNominationCount: {
              $cond: [
                { $eq: [maxNominationCount, 0] },
                1,
                { $divide: ["$nominationCount", maxNominationCount] },
              ],
            },
            normalizedCommentCount: {
              $cond: [
                { $eq: [maxCommentCount, 0] },
                1,
                { $divide: ["$commentCount", maxCommentCount] },
              ],
            },
          },
        },
        {
          $addFields: {
            compositeScore: {
              $add: [
                { $multiply: ["$normalizedReadCount", 0.4] },
                { $multiply: ["$normalizedNominationCount", 0.3] },
                { $multiply: ["$normalizedCommentCount", 0.3] },
              ],
            },
          },
        },
        { $sort: { compositeScore: -1 } },
      ]);
    } else {
      novelsQuery = Novel.find(query).sort(sortCriteria);
    }

    if (searchParams.limit) {
      novelsQuery = novelsQuery.limit(searchParams.limit);
    }

    const novels = await novelsQuery.exec();
    return createResponse(novels, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
