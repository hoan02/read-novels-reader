"use client";

import { ChapterType, NovelType } from "@/types/types";
import Options from "../Options";
import { defaultSettings } from "@/lib/constants";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

const PageChapterCustom = ({
  novel,
  chapter,
}: {
  novel: NovelType;
  chapter: ChapterType;
}) => {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  return (
    <div
      className={`bg-white shadow-md lg:px-16 p-4 rounded-lg z-0`}
      style={{
        color: settings.color,
        backgroundColor: settings.backgroundColor,
      }}
    >
      <div className="sticky top-2">
        <Options novel={novel} settings={settings} setSettings={setSettings} />
      </div>
      <h1 className="text-lg py-4 text-center">
        [{novel.novelName}]-{novel.author}
      </h1>
      <h1 className="text-3xl text-center">
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
          className="my-12"
          dangerouslySetInnerHTML={{
            __html: chapter.content,
          }}
        />
      </div>
    </div>
  );
};

export default PageChapterCustom;

// export const dynamic = "force-dynamic";
