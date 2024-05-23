// "use client";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { Comments, CommentsCount } from "react-facebook";

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
      {/* <CommentsCount href={`http://doctruyen.io.vn/truyen/$${novelSlug}`} /> */}
    </div>
  );
};

export default Comment;
