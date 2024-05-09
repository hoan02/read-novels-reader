"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Settings, List, Bookmark, ArrowLeft, ArrowRight } from "lucide-react";
import { ChapterType, NovelType } from "@/types/types";
import toast from "react-hot-toast";
import MenuChapter from "../novel/MenuChapter";
import Setting from "./Setting";

const Options = ({
  novel,
  chapter,
  chapters,
}: {
  novel: NovelType;
  chapter: ChapterType;
  chapters: ChapterType[];
}) => {
  const route = useRouter();
  const params = useParams<{ novelSlug: string; chapterIndex: string }>();
  const [openListChapter, setOpenListChapter] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const handleNextChapter = () => {
    if (parseInt(params.chapterIndex) === novel.chapterCount) {
      toast.error("Đây là chương cuối cùng của truyện!");
    } else {
      route.push(
        `/truyen/${params.novelSlug}/${parseInt(params.chapterIndex) + 1}`
      );
    }
  };

  const handlePrevChapter = () => {
    if (parseInt(params.chapterIndex) === 1) {
      toast.error("Đây là chương đầu tiên của truyện!");
    } else
      route.push(
        `/truyen/${params.novelSlug}/${parseInt(params.chapterIndex) - 1}`
      );
  };

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-1 border-2 rounded-full bg-white">
        <Tooltip title="Chương trước">
          <IconButton onClick={() => handlePrevChapter()}>
            <ArrowLeft />
          </IconButton>
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
          <IconButton>
            <Bookmark />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Chương sau">
          <IconButton onClick={() => handleNextChapter()}>
            <ArrowRight />
          </IconButton>
        </Tooltip>
      </div>

      <Dialog open={openListChapter} onClose={() => setOpenListChapter(false)}>
        <DialogContent className="w-[600px] h-[800px]">
          <div className="font-bold text-xl mb-2">
            [{novel.novelName}] - {novel.chapterCount} chương
          </div>
          <Divider />
          <MenuChapter chapters={chapters} />
        </DialogContent>
      </Dialog>
      <Dialog open={openSetting} onClose={() => setOpenSetting(false)}>
        <DialogContent className="w-[600px] h-[800px]">
          <div className="font-bold text-xl mb-2">Cấu hình</div>
          <Divider />
          <Setting />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Options;
