import { NovelType } from "@/types/types";

const Intro = ({ novel }: { novel: NovelType }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: novel.description,
      }}
    />
  );
};

export default Intro;
