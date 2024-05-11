"use client";

import { Divider } from "@mui/material";

import Setting from "@/components/Setting";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { defaultSettings } from "@/lib/constants";

const SettingPage = () => {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);
  return (
    <div className="flex">
      <div className="w-1/2">
        <Setting settings={settings} setSettings={setSettings} />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="w-1/2">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Lưu ý:</h1>
          <ul className="list-disc pl-2 ml-2 text-gray-600 space-y-2">
            <li>
              Cài đặt này chỉ có tác dụng ở trang đọc truyện của từng chương,
              không áp dụng trên toàn bộ website.
            </li>
            <li>
              Cài đặt được lưu trữ trong trình duyệt của bạn và sẽ bị xóa khi
              bạn xóa lịch sử duyệt web hoặc tắt trình duyệt.
            </li>
            <li>
              Các cài đặt này không ảnh hưởng đến cài đặt của các trang web
              khác.
            </li>
            <li>Không phải tất cả các trang web đều hỗ trợ các cài đặt này.</li>
            <li>
              Một số extension trên trình duyệt có thể ảnh hưởng tới cài đặt
              này, hãy thử tắt nó nếu cài đặt không hoạt động.
            </li>
          </ul>
          <h2 className="mt-20 mb-2 font-semibold">Hỗ trợ:</h2>
          <p className="ml-2 italic text-sm text-gray-600">
            Nếu bạn gặp bất kỳ sự cố nào khi cài đặt hoặc sử dụng các cài đặt
            này, vui lòng liên hệ với chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
