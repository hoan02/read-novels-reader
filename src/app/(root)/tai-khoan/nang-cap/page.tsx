import Link from "next/link";
import { Button } from "@mui/material";

import formatDate from "@/utils/formatDate";
import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import getUserInfoServer from "@/utils/getUserInfoServer";

const UpdateAccountPage = () => {
  const {
    avatar,
    frameAvatar,
    premiumState,
    premiumStartDate,
    premiumEndDate,
  } = getUserInfoServer();
  return (
    <div className="flex w-full h-full justify-center items-center font-mono">
      {premiumState ? (
        <div className="flex gap-10">
          <div>
            {avatar && (
              <AvatarFrame
                src={avatar}
                frame={frameAvatar}
                size={180}
                padding={5}
              />
            )}
            <p className="text-center">
              {frameAvatar === "reader-vip-1" ? "Khung bạc" : "Khung vàng"}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-semibold">
              Tài khoản của bạn đã được nâng cấp lên Premium!
            </p>
            <table className="w-[300px] mt-4">
              <tbody>
                <tr>
                  <td className="font-semibold">Hạng nâng cấp:</td>
                  <td>{frameAvatar}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Ngày nâng cấp:</td>
                  <td>{premiumStartDate && formatDate(premiumStartDate)}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Ngày hết hạn:</td>
                  <td>{premiumEndDate && formatDate(premiumEndDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="my-4">Tài khoản chưa được nâng cấp lên Premium</p>
          <div className="flex justify-center">
            <Link href={`/premium`}>
              <Button variant="contained">Nâng cấp ngay</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAccountPage;
