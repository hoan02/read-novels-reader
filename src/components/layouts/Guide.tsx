"use client";

import Link from "next/link";

const questions = [
  { id: "what-is-check-in", question: "Quy định khi tặng Hoa" },
  { id: "why-check-in", question: "Check-in để làm gì? Làm sao để check-in?" },
  { id: "how-to-increase-fanscore", question: "Làm sao để tăng điểm hâm mộ?" },
  {
    id: "inaccurate-read-count",
    question: 'Tôi thấy số "Đã đọc" trong đánh giá của tôi không chính xác?',
  },
  {
    id: "difference-between-regular-and-free-candy",
    question: "Kẹo thường và Kẹo miễn phí khác nhau như nào?",
  },
  {
    id: "how-to-check-candy-status",
    question: "Tôi muốn biết đang có bao nhiêu Kẹo, hạn sử dụng, đã sử dụng?",
  },
];

const Guide = () => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Hướng dẫn</h2>
      <ul className="list-disc">
        {questions.map(({ id, question }) => (
          <li key={id} className="ml-6 mb-2">
            <Link
              href={`/guide#${id}`}
              className="text-gray-500 hover:text-green-500"
            >
              {question.length > 31
                ? question.substring(0, 31) + "..."
                : question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guide;
