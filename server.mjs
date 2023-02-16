import { createServer } from "http";

const PORT = 1337;
const MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
import crypto from "crypto";
//HTTP Server
const server = createServer((request, response) => {
  response.writeHead(200);
  response.end("Hello");
  //   throw new Error('Mock Error');
}).listen(1337, () => console.log("Listening on port", PORT));

// Handshake
server.on("upgrade", (req, socket, head) => {
  // Get websocket key from client's upgrade req
  const { "sec-websocket-key": websocketKey } = req.headers;
  console.log({ websocketKey });

  //Create accept header using SHA1 Hash
  const sha = crypto.createHash("sha1");
  sha.update(websocketKey + MAGIC_STRING);
  const secWebSocketAcceptHeader = sha.digest("base64");

  console.log(secWebSocketAcceptHeader);
});

// Error handling
["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`Event: ${event}, message: ${err.stack || err}`);
  })
);
