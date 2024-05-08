import { NovelType } from "@/types/types";

const Intro = ({ novel }: { novel: NovelType }) => {
  return <div>{novel.description}</div>;
};

export default Intro;
