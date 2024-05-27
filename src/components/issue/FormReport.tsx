"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

import useUserInfoClient from "@/lib/hooks/useUserInfoClient";
import { createReport } from "@/lib/actions/report.action";

const FormReport = ({ novelSlug }: { novelSlug?: string }) => {
  const route = useRouter();
  const { fullName, email } = useUserInfoClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitIssue = async (e: any) => {
    e.preventDefault();
    const formData = {
      novelSlug,
      title,
      content,
    };
    const res = await createReport(formData);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
    route.push(`/tai-khoan/ho-tro`);
  };

  return (
    <div className="bg-white shadow-md p-2 lg:p-4 rounded-xl">
      <h1 className="text-lg text-center font-semibold">Báo cáo</h1>
      <form onSubmit={submitIssue}>
        <TextField
          label="Người gửi"
          fullWidth
          margin="normal"
          value={`${fullName} - ${email}`}
          disabled
        />
        <TextField
          label="Tiêu đề"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Mô tả"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-4">
          <Button variant="contained" type="submit" color="primary">
            Gửi báo cáo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormReport;
