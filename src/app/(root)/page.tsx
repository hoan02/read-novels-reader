import Guide from "@/components/layouts/Guide";
import ListNovel from "@/components/layouts/ListNovel";
import ListReading from "@/components/layouts/ListReading";

const HomePage = async () => {
  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <div className="lg:flex gap-4">
        <div className="lg:w-3/4">
          <ListNovel />
        </div>
        <div className="lg:w-1/4">
          <ListReading />
          <Guide />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
