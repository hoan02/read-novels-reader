import { getNovelsByParams } from "@/lib/data/novel.data";

const TopRead = async () => {
  const topRead = await getNovelsByParams({ rank: "doc-nhieu", limit: 2 });
  console.log(topRead);
  return <div>TopRead</div>;
};

export default TopRead;
