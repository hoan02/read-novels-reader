import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full mt-72 border-t-2">
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={90}
            height={90}
            className="m-4"
          />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <p className="text-center">
          Đọc truyện là nền tảng mở trực tuyến, miễn phí đọc truyện chữ được
          convert hoặc dịch kỹ lưỡng, do các converter và dịch giả đóng góp, rất
          nhiều truyện hay và nổi bật được cập nhật nhanh nhất với đủ các thể
          loại tiên hiệp, kiếm hiệp, huyền ảo ...
        </p>
      </div>
    </div>
  );
};

export default Footer;
