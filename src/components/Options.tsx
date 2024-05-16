"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Settings,
  List,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import MenuChapter from "./novel/MenuChapter";
import { NovelType, SettingsType } from "@/types/types";
import { checkBookmark } from "@/lib/data/bookmark.data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmark.action";
import Setting from "./Setting";

const Options = ({
  novel,
  settings,
  setSettings,
}: {
  novel: NovelType;
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
}) => {
  const route = useRouter();
  const params = useParams<{ novelSlug: string; chapterIndex: string }>();
  const [openListChapter, setOpenListChapter] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const queryClient = useQueryClient();
  const { data: bookmarkState, isLoading } = useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      return await checkBookmark(novel.novelSlug);
    },
    enabled: !!novel.novelSlug,
  });

  const handleClickBookmark = useMutation({
    mutationFn: () => {
      if (bookmarkState) {
        return deleteBookmark(novel.novelSlug);
      } else {
        return createBookmark(novel.novelSlug);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["bookmark"],
      });
      // revalidatePath("/");
    },
    onError: (res) => {
      toast.error(res.message);
      // revalidatePath("/");
    },
  });

  const handlePrevChapter = useCallback(() => {
    if (parseInt(params.chapterIndex) === 1) {
      toast.error("Đây là chương đầu tiên của truyện!");
    } else {
      route.push(
        `/truyen/${params.novelSlug}/${parseInt(params.chapterIndex) - 1}`
      );
    }
  }, [params.chapterIndex, params.novelSlug, route]);

  // Modify the handleNextChapter function with useCallback
  const handleNextChapter = useCallback(() => {
    if (parseInt(params.chapterIndex) === novel.chapterCount) {
      toast.error("Đây là chương cuối cùng của truyện!");
    } else {
      route.push(
        `/truyen/${params.novelSlug}/${parseInt(params.chapterIndex) + 1}`
      );
    }
  }, [params.chapterIndex, params.novelSlug, novel.chapterCount, route]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrevChapter();
          break;
        case "ArrowRight":
          handleNextChapter();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevChapter, handleNextChapter]);

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-1 border-2 rounded-full bg-white">
        <Tooltip title="Chương trước">
          <span>
            <IconButton
              disabled={parseInt(params.chapterIndex) === 1}
              onClick={() => handlePrevChapter()}
            >
              <ArrowLeft />
            </IconButton>
          </span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Cấu hình">
          <IconButton onClick={() => setOpenSetting(true)}>
            <Settings />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Danh sách chương">
          <IconButton onClick={() => setOpenListChapter(true)}>
            <List />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Đánh dấu">
          <IconButton onClick={() => handleClickBookmark.mutate()}>
            {bookmarkState ? (
              <BookmarkCheck
                strokeWidth={2}
                absoluteStrokeWidth
                className="text-green-500"
              />
            ) : (
              <Bookmark />
            )}
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Chương sau">
          <span>
            <IconButton
              disabled={parseInt(params.chapterIndex) === novel.chapterCount}
              onClick={() => handleNextChapter()}
            >
              <ArrowRight />
            </IconButton>
          </span>
        </Tooltip>
      </div>

      <Dialog open={openListChapter} onClose={() => setOpenListChapter(false)}>
        <DialogContent className="md:w-[600px] md:h-[800px] min-w-[320px]">
          <div className="font-bold text-xl mb-2">
            [{novel.novelName}] - {novel.chapterCount} chương
          </div>
          <Divider />
          <MenuChapter novelSlug={novel.novelSlug} />
        </DialogContent>
      </Dialog>
      <Dialog open={openSetting} onClose={() => setOpenSetting(false)}>
        <DialogContent className="md:w-[600px] md:h-[800px] min-w-[320px]">
          <div className="font-bold text-xl mb-2">Cấu hình</div>
          <Divider />
          <Setting settings={settings} setSettings={setSettings} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Options;
