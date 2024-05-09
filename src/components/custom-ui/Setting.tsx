"use client";

import { useEffect, useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";

interface Settings {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: string;
}

const settingsDefault: Settings = {
  color: "#555555",
  backgroundColor: "#F0F0F0",
  fontSize: 16,
  fontFamily: "Arial",
  lineHeight: 100,
  textAlign: "justify",
};

const Setting = () => {
  const [settings, setSettings] = useState<Settings>(settingsDefault);

  const colors = ["#333333", "#555555", "#777777", "#999999", "#AAAAAA"];
  const backgroundColors = [
    "#FFFFFF",
    "#F0F0F0",
    "#EEEEEE",
    "#DDDDDD",
    "#CCCCCC",
  ];
  const fontSizes = Array.from({ length: 20 }, (_, i) => (i + 6) * 2);
  const lineHeights = Array.from({ length: 11 }, (_, i) => (i + 10) * 10);
  const fontFamilies = ["Arial", "Tahoma", "Verdana", "Times New Roman"];
  const textAligns = [
    { key: "Trái", value: "left" },
    { key: "Giữa", value: "center" },
    { key: "Phải", value: "right" },
    { key: "Căn đều", value: "justify" },
  ];

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (field: keyof Settings) => (event: any) => {
    setSettings({ ...settings, [field]: event.target.value });
  };

  const resetSettings = () => {
    setSettings(settingsDefault);
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="color">Màu chữ:</label>
        <Select
          id="color"
          className="w-[200px]"
          value={settings.color}
          onChange={handleSettingChange("color")}
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              <div
                style={{
                  width: "150px",
                  height: "20px",
                  backgroundColor: color,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="backgroundColor">Màu nền:</label>
        <Select
          id="backgroundColor"
          className="w-[200px]"
          value={settings.backgroundColor}
          onChange={handleSettingChange("backgroundColor")}
        >
          {backgroundColors.map((color) => (
            <MenuItem key={color} value={color}>
              <div
                style={{
                  width: "150px",
                  height: "20px",
                  backgroundColor: color,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="fontSize">Cỡ chữ:</label>
        <Select
          id="fontSize"
          className="w-[200px]"
          value={settings.fontSize}
          onChange={handleSettingChange("fontSize")}
        >
          {fontSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}px
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="fontFamily">Font chữ:</label>
        <Select
          id="fontFamily"
          className="w-[200px]"
          value={settings.fontFamily}
          onChange={handleSettingChange("fontFamily")}
        >
          {fontFamilies.map((family) => (
            <MenuItem key={family} value={family}>
              {family}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="textAlign">Canh lề:</label>
        <Select
          id="textAlign"
          className="w-[200px]"
          value={settings.textAlign}
          onChange={handleSettingChange("textAlign")}
        >
          {textAligns.map((align) => (
            <MenuItem key={align.value} value={align.value}>
              {align.key}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="lineHeight">Khoảng cách dòng:</label>
        <Select
          id="lineHeight"
          className="w-[200px]"
          value={settings.lineHeight}
          onChange={handleSettingChange("lineHeight")}
        >
          {lineHeights.map((height) => (
            <MenuItem key={height} value={height}>
              {height}%
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="contained" color="primary" onClick={resetSettings}>
          Mặc định
        </Button>
      </div>
    </div>
  );
};

export default Setting;
