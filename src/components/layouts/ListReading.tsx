"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ListReading = () => {
  const [novels, setNovels] = useState([]);

  // useEffect(() => {
  //   // Tạo dữ liệu ngẫu nhiên cho danh sách tiểu thuyết
  //   const generateRandomNovels = () => {
  //     const types = [
  //       "Kiếm hiệp",
  //       "Huyền Huyễn",
  //       "Võng Du",
  //       "Đồng Nhân",
  //       "Cạnh Kỹ",
  //       "Tiên Hiệp",
  //       "Kỳ Ảo",
  //       "Khoa Huyễn",
  //       "Đô thị",
  //       "Đã sử",
  //       "Huyền Nghi",
  //     ];
  //     const randomNovels = [];
  //     for (let i = 0; i < 5; i++) {
  //       const novel = {
  //         img: `https://source.unsplash.com/200x250/?novel${i + 1}`,
  //         name: `Tiểu thuyết Mạnh nhất trên thế giới trên thế giới${i + 1}`,
  //         readCount: Math.floor(Math.random() * 1000) + 1,
  //         totalCount: 1000,
  //         type: types[Math.floor(Math.random() * types.length)],
  //       };
  //       randomNovels.push(novel);
  //     }
  //     return randomNovels;
  //   };

  //   // Cập nhật state với dữ liệu ngẫu nhiên
  //   setNovels(generateRandomNovels());
  // }, []);

  return (
    <div className="pb-4 border-b-2 border-gray-100">
      <h2 className="mb-4 text-lg font-semibold">Đang đọc</h2>
      <div className="grid grid-cols-1 gap-2">
        {novels.map((novel, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-2 rounded"
          >
            <Image
              src={novel.img}
              alt={novel.name}
              width={48}
              height={64}
              className="object-cover "
            />
            <div className="ml-4 flex-grow">
              <p className="text-sm font-semibold hover:text-green-500 cursor-pointer">
                {novel.name.length > 28
                  ? novel.name.substring(0, 28) + "..."
                  : novel.name}
              </p>
              <p className="mt-2 text-sm text-gray-600 flex justify-between">
                Đã đọc: {novel.readCount}/{novel.totalCount}
                <p className="text-xs text-red-600 hover:text-green-500 cursor-pointer ml-2">
                  Đọc tiếp
                </p>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListReading;
