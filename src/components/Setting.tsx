"use client";

import { useEffect, useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import {
  colors,
  backgroundColors,
  fontSizes,
  fontFamilies,
  lineHeights,
  textAligns,
  defaultSettings,
} from "@/lib/constants";
import { SettingsType } from "@/types/types";

const Setting = ({
  settings,
  setSettings,
}: {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
}) => {
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (field: keyof SettingsType) => (event: any) => {
    setSettings({ ...settings, [field]: event.target.value });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="flex flex-col p-2 lg:p-4 gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="color">Màu chữ:</label>
        <Select
          id="color"
          className="w-[160px] lg:w-[200px]"
          value={settings.color}
          onChange={handleSettingChange("color")}
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              <div
                className="w-[110px] lg:w-[150px] h-[20px]"
                style={{
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
          className="w-[160px] lg:w-[200px]"
          value={settings.backgroundColor}
          onChange={handleSettingChange("backgroundColor")}
        >
          {backgroundColors.map((color) => (
            <MenuItem key={color} value={color}>
              <div
                className="w-[110px] lg:w-[150px] h-[20px]"
                style={{
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
          className="w-[160px] lg:w-[200px]"
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
          className="w-[160px] lg:w-[200px]"
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
          className="w-[160px] lg:w-[200px]"
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
        <label htmlFor="lineHeight">Giãn dòng:</label>
        <Select
          id="lineHeight"
          className="w-[160px] lg:w-[200px]"
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
