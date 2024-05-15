"use client";

import {
  Divider,
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Setting from "@/components/Setting";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { defaultSettings } from "@/lib/constants";

const SettingPage = () => {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Setting settings={settings} setSettings={setSettings} />
        </Grid>
        <Grid item xs={12} md={6} className="p-4">
          <Typography variant="h6" gutterBottom>
            Lưu ý:
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                Cài đặt này chỉ có tác dụng ở trang đọc truyện của từng chương,
                không áp dụng trên toàn bộ website.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Cài đặt được lưu trữ trong trình duyệt của bạn và sẽ bị xóa khi
                bạn xóa lịch sử duyệt web hoặc tắt trình duyệt.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Các cài đặt này không ảnh hưởng đến cài đặt của các trang web
                khác.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Không phải tất cả các trang web đều hỗ trợ các cài đặt này.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Một số extension trên trình duyệt có thể ảnh hưởng tới cài đặt
                này, hãy thử tắt nó nếu cài đặt không hoạt động.
              </ListItemText>
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom className="mt-4">
            Hỗ trợ:
          </Typography>
          <Typography variant="body2" className="italic">
            Nếu bạn gặp bất kỳ sự cố nào khi cài đặt hoặc sử dụng các cài đặt
            này, vui lòng liên hệ với chúng tôi.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingPage;
