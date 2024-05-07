"use client";

import { useState, useEffect } from "react";
import Error from "@/components/layouts/Error";
import { getReviews } from "@/lib/data/review.data";
import { Avatar, LinearProgress } from "@mui/material";
import formatTimeAgo from "@/utils/formatTimeAgo";

const ListReview = ({ novelSlug }: { novelSlug: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, message, status } = await getReviews(novelSlug);
      setReviews(data);
      setMessage(message);
      setStatus(status);
      setLoading(false);
    };

    fetchReviews();
  }, [novelSlug]);

  return (
    <div className="rounded-lg w-full mt-4 text-gray-500">
      <div className="mb-2 ml-2 text-lg font-semibold">Tất cả đánh giá:</div>
      {loading ? (
        <LinearProgress />
      ) : status === 200 ? (
        <div className="space-y-2">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="p-4 pb-6 bg-slate-50 rounded-lg">
                <div className="flex gap-4 justify-between">
                  <div>
                    <Avatar alt="Remy Sharp" src={review.userInfo.avatar} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">
                      {review.userInfo.username}
                    </div>
                    <div className="mt-2 font-mono">{review.reviewContent}</div>
                  </div>

                  <div className="w-[48px] h-[48px] bg-white rounded-[24px] flex items-center justify-center">
                    <p className="text-sm font-bold text-red-500">
                      {review.avgScore}
                    </p>
                  </div>
                </div>
                <p className="text-xs float-end">
                  {formatTimeAgo(review.updatedAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="ml-2">Chưa có đánh giá nào!</div>
          )}
        </div>
      ) : (
        <Error message={message} status={status} />
      )}
    </div>
  );
};

export default ListReview;
