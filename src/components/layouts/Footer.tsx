import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full lg:mt-60 border-t-2">
      <div className="flex justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={90} height={90} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto p-2 lg:p-4">
        <p className="text-center text-sm">
          Đọc truyện là nền tảng mở trực tuyến, miễn phí đọc truyện chữ được
          convert hoặc dịch kỹ lưỡng, do các converter và dịch giả đóng góp, rất
          nhiều truyện hay và nổi bật được cập nhật nhanh nhất với đủ các thể
          loại tiên hiệp, kiếm hiệp, huyền ảo ...
        </p>
        <p className="my-4 text-center">
          <a
            className="border-2 border-dashed p-2 font-mono"
            href="https://www.facebook.com/hoanit02/"
            target="_blank"
          >
            Code by: HoanCuTe ❤️
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
