"use client";

import Link from "next/link";
import { Glasses } from "lucide-react";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getReading } from "@/lib/data/reading.data";

const ReadingButton = ({ novelSlug }: { novelSlug: string }) => {
  const { data: readingData, isLoading } = useQuery({
    queryKey: [`reading-${novelSlug}`],
    queryFn: async () => {
      return await getReading(novelSlug);
    },
    enabled: !!novelSlug,
  });

  if (
    readingData?.status === 401 ||
    (readingData?.status === 200 && readingData?.data.chapterIndex === 0)
  ) {
    return (
      <Button
        variant="outlined"
        size="large"
        style={{
          borderRadius: "30px",
          textTransform: "none",
        }}
        className="w-full lg:w-[168px]"
        startIcon={<Glasses size={24} />}
      >
        <Link href={`/truyen/${novelSlug}/1`}>Đọc truyện</Link>
      </Button>
    );
  }

  if (readingData?.status === 200) {
    return (
      <Button
        variant="outlined"
        size="large"
        style={{
          borderRadius: "30px",
          textTransform: "none",
        }}
        className="w-full lg:w-[168px]"
        startIcon={<Glasses size={24} />}
      >
        <Link href={`/truyen/${novelSlug}/${readingData?.data.chapterIndex}`}>
          Đọc tiếp
        </Link>
      </Button>
    );
  }

  return null;
};

export default ReadingButton;
