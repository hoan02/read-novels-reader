import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { Comments } from "react-facebook";

const Comment = ({ novelSlug }: { novelSlug: string }) => {
  return (
    <div className="w-full">
      <Suspense fallback={<LinearProgress />}>
        <Comments
          // lazy={true}
          width="100%"
          href={`http://doctruyen.io.vn/truyen/$${novelSlug}`}
        />
      </Suspense>
    </div>
  );
};

export default Comment;
