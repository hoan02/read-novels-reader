"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import ButtonPayment from "./ButtonPayment";

const Pricing = () => {
  return (
    <div className="py-[5rem] md:px-14 p-4 max-w-screen-2xl mx-auto">
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
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto"
      >
        <div className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
          <h3 className="text-3xl font-bold text-center text-[#010851]">
            Hạng Đồng
          </h3>
          <p className="mt-5 text-center text-secondary text-3xl font-bold">
            0đ
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
              Thông báo ra chương mới
            </li>
          </ul>

          <div className="w-full mx-auto flex items-center justify-center mt-5">
            <ButtonPayment order="month" />
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
              Thông báo ra chương mới
            </li>
          </ul>

          <div className="w-full mx-auto flex items-center justify-center mt-5">
            <ButtonPayment order="year" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
