"use client";

import { useEffect, useState } from "react";

interface Settings {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: string;
}

const settingsDefault: Settings = {
  color: "#111",
  fontSize: 16,
  fontFamily: "Arial",
  backgroundColor: "#fff",
  lineHeight: 100,
  textAlign: "justify",
};

const Setting = () => {
  const [settings, setSettings] = useState<Settings>(settingsDefault);

  const colors = ["#111", "#fff", "#f00", "#00f", "#0f0", "#ff0"];
  const fontSizes = [
    12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48,
    50,
  ];
  const fontFamilies = ["Arial", "Tahoma", "Verdana", "Times New Roman"];
  const lineHeights = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];
  const textAligns = ["left", "center", "right", "justify"];

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
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="color">Màu chữ:</label>
        <select
          id="color"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.color}
          onChange={handleSettingChange("color")}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="backgroundColor">Màu nền:</label>
        <select
          id="backgroundColor"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.backgroundColor}
          onChange={handleSettingChange("backgroundColor")}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="fontSize">Kích thước chữ:</label>
        <select
          id="fontSize"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.fontSize}
          onChange={handleSettingChange("fontSize")}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="fontFamily">Họ chữ:</label>
        <select
          id="fontFamily"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.fontFamily}
          onChange={handleSettingChange("fontFamily")}
        >
          {fontFamilies.map((family) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="lineHeight">Khoảng cách dòng:</label>
        <select
          id="lineHeight"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.lineHeight}
          onChange={handleSettingChange("lineHeight")}
        >
          {lineHeights.map((height) => (
            <option key={height} value={height}>
              {height}%
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="textAlign">Canh lề:</label>
        <select
          id="textAlign"
          className="w-[150px] py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={settings.textAlign}
          onChange={handleSettingChange("textAlign")}
        >
          {textAligns.map((align) => (
            <option key={align} value={align}>
              {align}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={resetSettings}
        >
          Mặc định
        </button>
      </div>
    </div>
  );
};

export default Setting;
