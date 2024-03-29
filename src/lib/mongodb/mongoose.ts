import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    console.error("MONGODB_URL không được định nghĩa trong biến môi trường");
    return;
  }

  if (isConnected) {
    // console.log("MongoDB đã được kết nối trước đó");
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: "read_novel_v2",
    } as ConnectOptions);

    isConnected = true;

    // console.log("MongoDB đã kết nối");
  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB:", error);
  }
};
