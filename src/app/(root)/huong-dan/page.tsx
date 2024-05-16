import { questions } from "@/lib/constants";

const page = () => {
  return (
    <div className="bg-white lg:shadow-md lg:p-8 lg:gap-4 gap-1 rounded-xl m-4">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Hướng dẫn</h1>
      <div className="space-y-6">
        {questions.map(({ id, question, answer }) => (
          <div
            id={id.toString()}
            key={id}
            className="p-4 bg-gray-50 rounded-lg shadow"
          >
            <p className="mb-2 text-lg font-semibold text-gray-900">
              {id}. {question}
            </p>
            <p className="text-gray-700">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
