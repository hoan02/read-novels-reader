import FormComment from "./FormComment";
import ListComment from "./ListComment";

const Comment = ({ novelSlug }: { novelSlug: string }) => {
  return (
    <div>
      <FormComment novelSlug={novelSlug} />
      <ListComment novelSlug={novelSlug} />
    </div>
  );
};

export default Comment;
