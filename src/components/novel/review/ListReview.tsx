"use client";

import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Error from "@/components/layouts/Error";
import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import { getReviews } from "@/lib/data/review.data";
import formatTimeAgo from "@/utils/formatTimeAgo";

const ListReview = ({ novelSlug }: { novelSlug: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`review-${novelSlug}`, novelSlug],
    queryFn: async () => {
      return await getReviews(novelSlug);
    },
    enabled: !!novelSlug,
  });

  if (isLoading) return <LinearProgress />;
  if (isError) return <Error />;

  return (
    <div className="rounded-lg w-full mt-4 text-gray-500">
      <div className="mb-2 ml-2 text-lg font-semibold">Tất cả đánh giá:</div>

      <div className="space-y-2">
        {data?.data?.map((review: any, index: number) => (
          <div key={index} className="p-2 md:p-4 pb-6 bg-slate-50 rounded-lg">
            <div className="flex gap-2 lg:gap-4 justify-between">
              <AvatarFrame
                src={review.userInfo?.avatar}
                frame={review.userInfo?.publicMetadata?.frameAvatar}
              />
              <div className="flex-1">
                <div className="text-sm font-bold">
                  {review.userInfo.firstName} {review.userInfo.lastName}
                </div>
                <div className="mt-2 font-mono">{review.reviewContent}</div>
              </div>

              <div className="w-6 h-6 rounded-[12px] md:w-12 md:h-12 md:rounded-[24px] flex items-center justify-center bg-white">
                <p className="text-sm font-bold text-red-500">
                  {review.avgScore}
                </p>
              </div>
            </div>
            <p className="text-xs float-end">
              {formatTimeAgo(review.updatedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListReview;
