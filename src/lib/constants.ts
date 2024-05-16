import {
  SquareUser,
  SquareLibrary,
  Settings,
  ScanBarcode,
  BellRing,
  MessageSquareWarning,
} from "lucide-react";
import { MenuIconType, SettingsType } from "../types/types";

export const statusErrorTitles: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

export const novelGenres: {
  name: string;
  slug: string;
}[] = [
  { name: "Kiếm hiệp", slug: "kiem-hiep" },
  { name: "Huyền Huyễn", slug: "huyen-huyen" },
  { name: "Võng Du", slug: "vong-du" },
  { name: "Đồng Nhân", slug: "dong-nhan" },
  { name: "Cạnh Kỹ", slug: "canh-ky" },
  { name: "Tiên Hiệp", slug: "tien-hiep" },
  { name: "Kỳ Ảo", slug: "ky-ao" },
  { name: "Khoa Huyễn", slug: "khoa-huyen" },
  { name: "Đô thị", slug: "do-thi" },
  { name: "Đã sử", slug: "da-su" },
  { name: "Huyền Nghi", slug: "huyen-nghi" },
];

export const novelRanks: {
  name: string;
  slug: string;
}[] = [
  { name: "Thịnh hành", slug: "thinh-hanh" },
  { name: "Đọc nhiều", slug: "doc-nhieu" },
  // { name: "Tặng thưởng", slug: "tang-thuong" },
  { name: "Đề cử", slug: "de-cu" },
  { name: "Yêu thích", slug: "yeu-thich" },
  { name: "Thảo luận", slug: "thao-luan" },
];

export const menuAccount: MenuIconType[] = [
  {
    icon: SquareUser,
    name: "Hồ sơ",
    slug: "/tai-khoan/ho-so",
  },
  {
    icon: SquareLibrary,
    name: "Tủ truyện",
    slug: "/tai-khoan/tu-truyen",
  },
  {
    icon: Settings,
    name: "Cài đặt",
    slug: "/tai-khoan/cai-dat",
  },
  {
    icon: ScanBarcode,
    name: "Nâng cấp",
    slug: "/tai-khoan/nang-cap",
  },
  // {
  //   icon: BellRing,
  //   name: "Thông báo",
  //   slug: "/tai-khoan/thong-bao",
  // },
  {
    icon: MessageSquareWarning,
    name: "Trợ giúp & Báo lỗi",
    slug: "/tai-khoan/ho-tro",
  },
];

export const subMenuAccount = menuAccount.slice(0, 4);

export const colors = [
  "#111111",
  "#333333",
  "#555555",
  "#777777",
  "#999999",
  "#AAAAAA",
];
export const backgroundColors = [
  "#f8fafc",
  "#f4f4f4",
  "#e9ebee",
  "#f4f4e4",
  "#f5ebcd",
  "#c2b49c",
  "#272727",
  "#1e293b",
];
export const fontSizes = Array.from({ length: 20 }, (_, i) => (i + 6) * 2);
export const lineHeights = Array.from({ length: 11 }, (_, i) => (i + 10) * 10);
export const fontFamilies = [
  "Arial",
  "Segoe UI",
  "Tahoma",
  "Verdana",
  "Times New Roman",
];
export const textAligns = [
  { key: "Trái", value: "left" },
  { key: "Giữa", value: "center" },
  { key: "Phải", value: "right" },
  { key: "Căn đều", value: "justify" },
];

export const defaultSettings: SettingsType = {
  color: "#333333",
  backgroundColor: "#f8fafc",
  fontSize: 16,
  fontFamily: "Arial",
  lineHeight: 100,
  textAlign: "justify",
};

export const questions = [
  {
    id: "1",
    question: "Làm thế nào để đăng ký tài khoản?",
    answer:
      "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút 'Đăng nhập' ở góc trên bên phải của trang chủ rồi chọn đăng nhập với facebook/google hoặc chọn 'Đăng kí' và điền vào các thông tin cần thiết.",
  },
  {
    id: "2",
    question: "Tôi có thể tìm truyện theo thể loại nào?",
    answer:
      "Bạn có thể tìm truyện theo nhiều thể loại khác nhau như hành động, phiêu lưu, tình cảm, hài hước, kinh dị, và nhiều thể loại khác.",
  },
  {
    id: "3",
    question: "Làm thế nào để thay đổi cài đặt đọc truyện?",
    answer:
      "Bạn có thể thay đổi cài đặt đọc truyện bằng cách bấm vào menu phía goc trên bên phải hoặc truy cập vào trang đọc truyện(chương) và chọn biểu tượng cài đặt. Tại đây, bạn có thể điều chỉnh kích thước chữ, màu nền, và các cài đặt khác.",
  },
  {
    id: "4",
    question: "Tôi có thể lưu truyện để đọc sau không?",
    answer:
      "Có, bạn có thể lưu truyện để đọc sau bằng cách bấm vào nút 'Đánh dấu'",
  },
  {
    id: "5",
    question: "Làm thế nào để báo cáo lỗi về truyện hoặc chương?",
    answer:
      "Nếu bạn phát hiện lỗi hoặc vấn đề với truyện hoặc chương, bạn có thể báo cáo bằng cách sử dụng nút 'Báo cáo' và điền vào mẫu báo cáo. Chúng tôi sẽ xem xét và khắc phục sớm nhất có thể.",
  },
];
