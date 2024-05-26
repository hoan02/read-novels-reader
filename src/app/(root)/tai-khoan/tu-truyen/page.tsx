"use client";

import { useState } from "react";
import { Tab } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { TabPanel, TabContext, TabList } from "@mui/lab";

import ListReading from "@/components/layouts/ListReading";
import ListBookmark from "@/components/novel/ListBookmark";

const NovelShelfPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dang-doc";
  const [value, setValue] = useState(tab);

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="border-[1px] rounded-lg">
      <TabContext value={value}>
        <TabList onChange={handleChange} className="border-b-2">
          <Tab label="Đang đọc" value="dang-doc" />
          <Tab label="Đánh dấu" value="danh-dau" />
        </TabList>
        <TabPanel value="dang-doc">
          <ListReading />
        </TabPanel>
        <TabPanel value="danh-dau">
          <ListBookmark />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default NovelShelfPage;
