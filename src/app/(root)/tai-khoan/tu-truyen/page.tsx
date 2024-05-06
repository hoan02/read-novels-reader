"use client";

import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const NovelShelfPage = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <TabContext value={value}>
        <TabList onChange={handleChange} className="border-b-2">
          <Tab label="Đang đọc" value="1" />
          <Tab label="Đánh dấu" value="2" />
        </TabList>
        <TabPanel value="1">Đang đọc</TabPanel>
        <TabPanel value="2">Đánh dấu</TabPanel>
      </TabContext>
    </div>
  );
};

export default NovelShelfPage;
