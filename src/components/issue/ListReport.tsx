import { getReport } from "@/lib/data/report.data";
import React from "react";
import Error from "../layouts/Error";
import { ReportType } from "@/types/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import formatTimeAgo from "@/utils/formatTimeAgo";

const ListReport = async () => {
  const { data, status, message } = await getReport();
  if (status !== 200) return <Error message={message} status={status} />;

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Danh sách báo cáo đã gửi:</div>
      <div className="space-y-2">
        {data.map((report: ReportType) => {
          return (
            <div key={report._id} className="border-b-[1px]">
              <Accordion>
                <AccordionSummary
                  className="flex items-center text-sm"
                  expandIcon={<ChevronDown />}
                >
                  <p className="w-[100px]">{formatTimeAgo(report.createdAt)}</p>
                  <p className="font-bold flex-1">{report.title}</p>
                  <p>
                    {report.isResolved ? (
                      <Chip
                        label="Đã giải quyết"
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="Chưa giải quyết"
                        color="error"
                        size="small"
                      />
                    )}
                  </p>
                </AccordionSummary>
                <AccordionDetails className="text-gray-500 space-y-1">
                  <div>
                    <span className="font-semibold">Nội dung:</span>{" "}
                    {report.content}
                  </div>
                  {report.isResolved && (
                    <div>
                      <span className="font-semibold">Trả lời:</span>{" "}
                      {report.messageReply}
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListReport;
