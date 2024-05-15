import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const SupportPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Trợ giúp
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="#" underline="none" color="primary">
                  Hướng dẫn sử dụng
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#" underline="none" color="primary">
                  Câu hỏi thường gặp
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Liên hệ: <a href="mailto:lehoan.dev@gmail.com">lehoan.dev@gmail.com</a></ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Báo lỗi
          </Typography>
          <form>
            <TextField label="Tiêu đề" fullWidth margin="normal" />
            <TextField
              label="Mô tả"
              fullWidth
              margin="normal"
              multiline
              rows={5}
            />
            <Button variant="contained" type="submit" color="primary">
              Gửi báo cáo
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SupportPage;
