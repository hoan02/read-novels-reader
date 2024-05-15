"use client";

import Setting from "@/components/Setting";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { defaultSettings } from "@/lib/constants";
import { Divider } from "@mui/material";

const SettingPage = () => {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  return (
    <div className="my-2 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full border-[1px] p-4 rounded-lg">
        <Setting settings={settings} setSettings={setSettings} />
      </div>
      <div className="w-full border-[1px] p-4 rounded-lg">
        <h6 className="text-lg font-semibold mb-2">Lưu ý:</h6>
        <ul>
          <li className="mb-2">
            Cài đặt này chỉ có tác dụng ở trang đọc truyện của từng chương,
            không áp dụng trên toàn bộ website.
          </li>
          <li className="mb-2">
            Cài đặt được lưu trữ trong trình duyệt của bạn và sẽ bị xóa khi bạn
            xóa lịch sử duyệt web hoặc tắt trình duyệt.
          </li>
          <li className="mb-2">
            Các cài đặt này không ảnh hưởng đến cài đặt của các trang web khác.
          </li>
          <li className="mb-2">
            Không phải tất cả các trang web đều hỗ trợ các cài đặt này.
          </li>
          <li className="mb-2">
            Một số extension trên trình duyệt có thể ảnh hưởng tới cài đặt này,
            hãy thử tắt nó nếu cài đặt không hoạt động.
          </li>
        </ul>

        <h6 className="text-lg font-semibold mt-4 mb-2">Hỗ trợ:</h6>
        <p className="italic">
          Nếu bạn gặp bất kỳ sự cố nào khi cài đặt hoặc sử dụng các cài đặt này,
          vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default SettingPage;
