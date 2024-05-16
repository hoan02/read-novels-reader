import Guide from "@/components/layouts/Guide";
import { TextField, Button } from "@mui/material";

const SupportPage = () => {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
        <div className="border-[1px] p-4 rounded-lg">
          <h5 className="text-lg font-semibold">Báo lỗi</h5>
          <form>
            <TextField label="Tiêu đề" fullWidth margin="normal" />
            <TextField
              label="Mô tả"
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <div className="mt-4">
              <Button variant="contained" type="submit" color="primary">
                Gửi báo cáo
              </Button>
            </div>
          </form>
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
    </div>
  );
};

export default SupportPage;
