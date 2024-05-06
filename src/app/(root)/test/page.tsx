import ListReading from "@/components/custom-ui/ListReading";
import { getRecentlyReadNovels } from "@/lib/data/marked.data";
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

const getData = unstable_cache(
  async () => getRecentlyReadNovels(5),
  ["novel-reading"]
);

export default async function Page() {
  const data = await getRecentlyReadNovels(5);
  console.log(data);

  return <div>
    <ListReading />
  </div>;
}
