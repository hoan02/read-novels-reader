"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Turnstile } from "@marsidev/react-turnstile";

import { ChapterType, NovelType } from "@/types/types";
import Options from "../Options";
import Comment from "@/components/novel/comment/Comment";
import { defaultSettings } from "@/lib/constants";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { createOrUpdateReading } from "@/lib/actions/reading.action";
import { updateReadNovel } from "@/lib/actions/novel.action";

const PageChapterCustom = ({
  checkBot = false,
  novel,
  chapter,
}: {
  checkBot?: boolean;
  novel: NovelType;
  chapter: ChapterType;
}) => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);
  const [hasRead, setHasRead] = useState(false);
  const [status, setStatus] = useState(checkBot);

  const handleReading = useMutation({
    mutationFn: () =>
      createOrUpdateReading(novel.novelSlug, chapter.chapterIndex),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["reading"],
      });
    },
  });

  const handleRead = async () => {
    await updateReadNovel(novel._id);
  };

  useEffect(() => {
    handleReading.mutate();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPercentage =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;
      if (scrolledPercentage > 0.8 && !hasRead) {
        handleRead();
        setHasRead(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasRead]);

  return (
    <>
      {status ? (
        <Turnstile
          siteKey="0x4AAAAAAAc37VBmXfbLsHlk"
          className="mx-auto my-20"
          onSuccess={() => setStatus(false)}
        />
      ) : (
        <div
          className={`bg-white shadow-md lg:px-16 p-4 rounded-lg z-0`}
          style={{
            color: settings.color,
            backgroundColor: settings.backgroundColor,
          }}
        >
          <div className="sticky top-2">
            <Options
              novel={novel}
              settings={settings}
              setSettings={setSettings}
            />
          </div>

          <h1 className="text-base lg:text-lg font-semibold py-4 text-center text-green-700">
            <Link href={`/truyen/${novel.novelSlug}`}>
              [{novel.novelName}] - {novel.author}
            </Link>
          </h1>
          <h1 className="text-xl lg:text-3xl text-center">
            Chương {chapter.chapterIndex}: {chapter.chapterName}
          </h1>
          <div
            style={{
              fontSize: settings.fontSize,
              fontFamily: settings.fontFamily,
              lineHeight: (settings.lineHeight / 100) * 1.5,
              textAlign: settings.textAlign,
            }}
          >
            <div
              className="my-6 lg:my-12"
              dangerouslySetInnerHTML={{
                __html: chapter.content,
              }}
            />
          </div>
          <div className="sticky bottom-2">
            <div className="flex justify-center">
              <div
                className="min-w-[300px] lg:w-[500px]"
                id="ra-player"
                data-skin="https://assets.readaloudwidget.com/embed/skins/default"
              ></div>
            </div>
          </div>
          <Comment novelSlug={novel.novelSlug} />

          <audio
            id="ra-audio"
            data-lang="vi-VN"
            data-voice="free"
            data-key="6acd27b2a608b22126ed36bd22dbb420"
          />
        </div>
      )}
    </>
  );
};

export default PageChapterCustom;
