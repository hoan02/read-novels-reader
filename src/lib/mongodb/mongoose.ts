import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  const mongoUrl = process.env.MONGO_URI;

  if (!mongoUrl) {
    console.error("MONGO_URI không được định nghĩa trong biến môi trường");
    return;
  }

  if (isConnected) {
    // console.log("MongoDB đã được kết nối trước đó");
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      //   dbName: "read_novel_v2",
    } as ConnectOptions);

    isConnected = true;

    // console.log("MongoDB đã kết nối");
  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB:", error);
  }
};

export default connectToDB;
