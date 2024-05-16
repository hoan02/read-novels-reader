import { questions } from "@/lib/constants";
import Link from "next/link";

const Guide = () => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Hướng dẫn</h2>
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
