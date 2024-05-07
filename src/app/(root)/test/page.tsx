import InputSearch from "@/components/custom-ui/InputSearch";
import ListReading from "@/components/custom-ui/ListReading";
import { getReviews } from "@/lib/data/review.data";
import { unstable_cache } from "next/cache";

// import { socket } from "@/socket";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [isConnected, setIsConnected] = useState(false);
//   const [transport, setTransport] = useState("N/A");

//   useEffect(() => {
//     if (socket.connected) {
//       onConnect();
//     }

//     function onConnect() {
//       setIsConnected(true);
//       setTransport(socket.io.engine.transport.name);

//       socket.io.engine.on("upgrade", (transport: any) => {
//         setTransport(transport.name);
//       });
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//       setTransport("N/A");
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//     };
//   }, []);

//   return (
//     <div>
//       <p>Status: { isConnected ? "connected" : "disconnected" }</p>
//       <p>Transport: { transport }</p>
//     </div>
//   );
// }

export default async function Page() {
  const data = await getReviews("tu-cam");
  console.log(data);
  return <div>{data && data.status} ok</div>;
}
