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
  // -------------------HANDSHAKE------------------

  // 1. Get websocket key from client's upgrade req
  const { "sec-websocket-key": websocketKey } = req.headers;
  console.log({ websocketKey });

  // 2.Create accept header using SHA1 Hash
  const sha = crypto.createHash("sha1");
  sha.update(websocketKey + MAGIC_STRING);
  const secWebSocketAcceptHeader = sha.digest("base64");
  console.log(secWebSocketAcceptHeader);

  // 3.Add the other headers as per the docs
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${secWebSocketAcceptHeader}`,
    "",
  ]
    .map((line) => line.concat("\r\n"))
    .join("");

  // 4. Return the socket with headers
  socket.write(headers);
});

// Error handling
["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`Event: ${event}, message: ${err.stack || err}`);
  })
);
