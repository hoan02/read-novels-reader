"use client";

import { getNominations } from "@/lib/data/nomination.data";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import AvatarFrame from "../custom-ui/AvatarFrame";

const ListNomination = ({ novelSlug }: { novelSlug: string }) => {
  const {
    data: nominations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["nomination"],
    queryFn: async () => {
      return await getNominations(novelSlug);
    },
    enabled: !!novelSlug,
  });

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Error</div>;

  console.log(nominations?.data);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {nominations?.data?.map((nomination: any, index: number) => (
          <div
            key={nomination._id}
            className={`p-4 border ${
              index < 3 ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <AvatarFrame
                src={nomination.user.avatar}
                frame={nomination.user.publicMetadata.frameAvatar}
              />

              <div className="ml-4">
                <p className="font-bold">
                  {nomination.user.firstName} {nomination.user.lastName}
                </p>
                <p className="text-sm text-gray-500">{nomination.user.publicMetadata.frameAvatar}</p>
              </div>
            </div>
            {index < 3 && (
              <span className="inline-block bg-red-500 text-white px-2 py-1 mt-2 rounded text-xs">
                Top {index + 1}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNomination;
