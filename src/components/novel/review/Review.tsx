import { Divider } from "@mui/material";

import { NovelType } from "@/types/types";
import FormReview from "./FormReview";
import ListReview from "./ListReview";

const Review = ({ novel }: { novel: NovelType }) => {
  return (
    <div className="flex gap-4 font-source-sans-pro text-green-700">
      <div className="w-2/3">
        <FormReview novelSlug={novel.novelSlug} />
        <ListReview novelSlug={novel.novelSlug} />
      </div>
      <div className="w-1/3">
        <div className="bg-green-50 p-4 rounded-lg space-y-4">
          <p className="text-lg font-semibold">
            Đã có {novel.reviews.count} đánh giá
          </p>
          <Divider />
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="p-2">Tính cách nhân vật</td>
                <td className="p-2">{novel.reviews.avgScoreCharacter} điểm</td>
              </tr>
              <tr>
                <td className="p-2">Nội dung cốt truyện</td>
                <td className="p-2">{novel.reviews.avgScorePlot} điểm</td>
              </tr>
              <tr>
                <td className="p-2">Bố cục thế giới</td>
                <td className="p-2">{novel.reviews.avgScoreWorld} điểm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-green-50 p-4 rounded-lg mt-4 space-y-4">
          <p className="text-lg font-semibold">Lưu ý khi đánh giá</p>
          <Divider />
          <ul className="list-decimal ml-4 p-2 space-y-1">
            <li>
              Phải đánh giá đủ cả 3 yếu tố: tính cách nhân vật, nội dung cốt
              truyện và bố cục thế giới.
            </li>
            <li>Nội dung đánh giá tốt thiểu 10 kí tự.</li>
            <li>Không được dẫn link hoặc nhắc đến website khác.</li>
            <li>
              Không được có những từ ngữ gay gắt, đả kích, xúc phạm người khác.
            </li>
            <li>
              Đánh giá hoặc bình luận không liên quan tới truyện sẽ bị xóa.
            </li>
            <li>
              Đánh giá hoặc bình luận chê truyện một cách chung chung không mang
              lại giá trị cho người đọc sẽ bị xóa.
            </li>
            <li>
              Đánh giá có điểm số sai lệch quá lớn, không khách quan sẽ bị xóa.
            </li>
          </ul>
          <p className="italic text-sm">
            Vui lòng xem và tuân theo đầy đủ các quy định tại Điều Khoản Dịch Vụ
            khi sử dụng website
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
