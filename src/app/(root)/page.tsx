import Guide from "@/components/custom-ui/Guide";
import ListNovel from "@/components/custom-ui/ListNovel";
import ListReading from "@/components/custom-ui/ListReading";

const HomePage = () => {
  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <div className="flex gap-4">
        <div className="w-3/4">
          <ListNovel />
        </div>
        <div className="w-1/4">
          <ListReading />
          <Guide />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
