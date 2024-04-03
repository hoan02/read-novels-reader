import { Search } from "lucide-react";

const InputSearch = () => {
  return (
    <div className="flex-1 mx-10 relative max-w-md">
      <input
        className="w-full px-5 py-2 rounded-full border-none focus:outline-green-500 font-normal text-sm"
        type="text"
        placeholder="Tìm kiếm truyện..."
      />
      <Search
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer opacity-40"
        size={24}
      />
    </div>
  );
};

export default InputSearch;
