import { NovelType } from "@/lib/types";

const Intro = ({novel}: {novel: NovelType}) => {
  return <div>{novel.description}</div>;
};

export default Intro;
