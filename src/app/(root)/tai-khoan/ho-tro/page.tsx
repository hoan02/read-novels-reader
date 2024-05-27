import FormReport from "@/components/issue/FormReport";
import ListReport from "@/components/issue/ListReport";
import Guide from "@/components/layouts/Guide";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

const SupportPage = () => {
  return (
    <div className="container mx-auto max-w-5xl ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
        <div className="border-[1px] p-4 rounded-lg">
          <FormReport />
        </div>
        <div className="border-[1px] p-4 rounded-lg">
          <Guide />
          <div>
            Liên hệ:{" "}
            <a href="mailto:lehoan.dev@gmail.com" className="font-semibold">
              lehoan.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="border-[1px] p-4 rounded-lg mt-2 lg:mt-4">
        <Suspense fallback={<LinearProgress />}>
          <ListReport />
        </Suspense>
      </div>
    </div>
  );
};

export default SupportPage;

export const dynamic = "force-dynamic";
