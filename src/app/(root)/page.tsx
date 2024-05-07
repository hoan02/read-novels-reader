import Guide from "@/components/custom-ui/Guide";
import ListNovel from "@/components/custom-ui/ListNovel";
import ListReading from "@/components/custom-ui/ListReading";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <div className="flex gap-4">
        <div className="w-3/4">
          <ListNovel />
        </div>
        <div className="w-1/4">
          {user && <ListReading />}
          <Guide />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const dynamic = "force-dynamic";
