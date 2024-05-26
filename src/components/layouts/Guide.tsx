import { questions } from "@/lib/constants";
import Link from "next/link";

const Guide = () => {
  return (
    <div className="bg-gray-50 rounded-lg">
      <h2 className="p-2">HƯỚNG DẪN</h2>
      <ul className="list-disc">
        {questions.map(({ id, question }) => (
          <li key={id} className="ml-6 mb-2 text-sm">
            <Link
              href={`/huong-dan#${id}`}
              className="text-gray-500 hover:text-green-500"
            >
              {question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guide;
