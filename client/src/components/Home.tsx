// import { Button, Card, Grid, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { atomMessage } from "../store/atoms/sideBar";

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
//   msg: (msg: string) => void;
// }

// interface ClientToServerEvents {
//   hello: (msg: string) => void;
// }
// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
//   "http://localhost:3000"
// );

// export default function Home() {
//   const [input, setInput] = useState("");
//   const message = useRecoilValue(atomMessage);
//   const setAtomMessage = useSetRecoilState(atomMessage);

//   const handleSend = () => {
//     socket.emit("hello", input);
//     setAtomMessage({
//       send: "",
//       receive: [...message.receive, input],
//     });
//     setInput("");
//   };

//   useEffect(() => {
//     socket.on("msg", (mess) => {
//       setAtomMessage({
//         send: message.send,
//         receive: [...message.receive, mess],
//       });
//     });
//     return () => {
//       socket.off("msg");
//     };
//   }, []);
//   return (
//     <div style={{ display: "flex", backgroundColor: "black" }}>
//       <Grid
//         container
//         style={{
//           backgroundColor: "black",
//           height: "100vh",
//         }}
//       >
//         <Grid item xs={12}>
//           <Card
//             style={{
//               height: "95vh",
//               margin: "10px",
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <div
//               id="chat"
//               style={{
//                 backgroundColor: "#f0f0f0",
//                 padding: "10px",
//                 fontSize: "24px",
//                 borderTop: "1px solid #ccc",
//                 borderBottom: "1px solid #ccc",
//               }}
//             >
//               <Typography variant="h5">Chat</Typography>
//             </div>
//             <div style={{ padding: "20px", flexGrow: 1, overflowY: "auto" }}>
//               {message.receive.map((display, index) => (
//                 <div key={index} style={{ marginBottom: "10px" }}>
//                   {display}
//                 </div>
//               ))}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "10px",
//                 borderTop: "1px solid #ccc",
//               }}
//             >
//               <TextField
//                 placeholder="Type a message"
//                 value={input}
//                 style={{ flex: 1, marginRight: "10px" }}
//                 onChange={(e) => setInput(e.target.value)}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSend}
//                 style={{ width: "100px" }}
//               >
//                 Send
//               </Button>
//             </div>
//           </Card>
//         </Grid>
//       </Grid>{" "}
//     </div>
//   );
// }
