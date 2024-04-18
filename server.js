import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinOrderRoom", (orderCode) => {
      console.log(`Client joined room: ${orderCode}`);
      socket.join(orderCode);
    });

    socket.on("leaveOrderRoom", (orderCode) => {
      console.log(`Client left room: ${orderCode}`);
      socket.leave(orderCode);
    });

    // This is a placeholder. You should replace this with your actual logic
    // for when and how the 'paymentUpdated' event is emitted.
    // For example, you might emit this event when you receive a webhook from your payment provider.
    setInterval(() => {
      const data = {
        orderId: "exampleOrderCode", // Replace this with actual order code
        // Add any other data you want to send here
      };
      io.to(data.orderId).emit("paymentUpdated", data);
    }, 5000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
