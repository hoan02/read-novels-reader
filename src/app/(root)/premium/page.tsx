import { Info } from "lucide-react";

import PaymentButton from "@/components/custom-ui/PaymentButton";
import getUserInfoServer from "@/utils/getUserInfoServer";

const PremiumPage = () => {
  const { premiumState, frameAvatar } = getUserInfoServer();

  return (
    <div className="mt-20">
      <div
        id="pricing"
        className="py-[5rem] md:px-14 p-4 max-w-screen-2xl mx-auto"
      >
        <div className="text-center">
          <h2 className="md:text-5xl md:leading-tight text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-2">
            Trải nghiệm đọc truyện không quảng cáo, đọc trước các chương sắp ra
            cùng với Premium
          </h2>
          <p className="mt-10 text-tertiary md:w-1/2 mx-auto">
            Nâng cấp tài khoản lên Premium với mức giá cực kì ưu đãi. Thanh toán
            cực nhanh và dễ dàng với QR Code
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto">
          <div className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
            <h3 className="text-3xl font-bold text-center text-[#010851]">
              Hạng Đồng
            </h3>
            <p className="mt-5 text-center text-secondary text-xl font-bold">
              Miễn phí
            </p>
            <ul className="mt-4 space-y-2 px-4">
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đọc truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh giá truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Bình luận
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh dấu
              </li>
            </ul>
          </div>

          <div className="premium-banner border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
            <h3 className="text-3xl font-bold text-center text-[#010851]">
              Hạng Bạc
            </h3>
            <p className="mt-5 text-center text-secondary text-xl font-bold">
              29.000đ / 1 tháng
            </p>
            <ul className="mt-4 space-y-2 px-4">
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đọc truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh giá truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Bình luận
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh dấu
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Không quảng cáo
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đọc trước chương mới
              </li>

              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Khung bạc (avatar)
              </li>
            </ul>

            <div className="w-full mx-auto flex items-center justify-center mt-5">
              {premiumState ? (
                <div className="mt-6 px-10 text-white py-2 bg-green-500  font-semibold rounded-lg">
                  Đã nâng cấp
                </div>
              ) : (
                <PaymentButton order="month" />
              )}
            </div>
          </div>

          <div className="premium-banner border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
            <h3 className="text-3xl  font-bold text-center text-[#010851]">
              Hạng vàng
            </h3>
            <p className="mt-5 text-center text-secondary text-xl font-bold">
              259.000đ / 1 năm
            </p>
            <ul className="mt-4 space-y-2 px-4">
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đọc truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh giá truyện
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Bình luận
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đánh dấu
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Không quảng cáo
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Đọc trước chương mới
              </li>
              <li className="flex items-center">
                <Info className="mr-2 text-xl text-green-500" />
                Khung vàng (avatar)
              </li>
            </ul>

            <div className="w-full mx-auto flex items-center justify-center mt-5">
              {premiumState && frameAvatar !== "reader-vip-1" ? (
                <div className="mt-6 px-10 text-white py-2 bg-green-500  font-semibold rounded-lg">
                  Đã nâng cấp
                </div>
              ) : (
                <PaymentButton order="month" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
