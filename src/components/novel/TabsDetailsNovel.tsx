"use client";

import { useState } from "react";
import { Box, Tab, Chip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Intro from "./Intro";
import Comment from "./comment/Comment";
import Review from "./review/Review";
import MenuChapter from "@/components/novel/MenuChapter";
import { ChapterType, NovelType } from "@/types/types";
import ListNomination from "./ListNomination";

const TabsDetailsNovel = ({ novel }: { novel: NovelType }) => {
  const [value, setValue] = useState("gioi-thieu");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const tabList = [
    {
      label: "Giới thiệu",
      value: "gioi-thieu",
      chip: null,
      content: <Intro novel={novel} />,
    },
    {
      label: "Đánh giá",
      value: "danh-gia",
      chip: novel.reviews.count,
      content: <Review novel={novel} />,
    },
    {
      label: "Danh sách chương",
      value: "danh-sach-chuong",
      chip: novel.chapterCount,
      content: <MenuChapter novelSlug={novel.novelSlug} />,
    },
    {
      label: "Bình luận",
      value: "binh-luan",
      chip: novel.commentCount,
      content: <Comment novelSlug={novel.novelSlug}/>,
    },
    {
      label: "Đề cử",
      value: "de-cu",
      chip: novel.nominationCount,
      content: <ListNomination novelSlug={novel.novelSlug} />,
    },
  ];

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onChange={handleChange}
            aria-label="Tabs details novel"
          >
            {tabList.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  label={
                    <div className="flex items-center gap-2">
                      {tab.label}
                      {tab.chip !== null && <Chip label={tab.chip} />}
                    </div>
                  }
                  value={tab.value}
                  style={{
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                />
              );
            })}
          </TabList>
        </Box>
        {tabList.map((tab) => {
          return (
            <TabPanel
              key={tab.value}
              value={tab.value}
              style={{
                padding: 0,
                marginTop: "20px",
              }}
            >
              {tab.content}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};

export default TabsDetailsNovel;
