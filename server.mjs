import { createServer } from "http";

const PORT = 1337;
//HTTP Server
const server = createServer((request, response) => {
  response.writeHead(200);
  response.end("Hello");
  //   throw new Error('Mock Error');
}).listen(1337, () => console.log("Listening on port", PORT));

server.on("upgrade", (req, socket, head) => {
  console.log({req, socket, head});
});

// Error handling
["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`Event: ${event}, message: ${err.stack || err}`);
  })
);
