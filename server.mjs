import { createServer } from "http";

const PORT = 1337;
createServer((request, response) => {
  response.writeHead(200);
  response.end("Hello");
}).listen(1337, () => console.log("Listening on port", PORT));
