import http from "http";
import WebSocket from "ws";
import express from "express";
import { Http2ServerRequest } from "http2";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

console.log("http://localhost:3020/");

// app.listen(3020);
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", socket => {
  sockets.push(socket);
  console.log("브라우저에 연결됨");
  socket.on("close", () => {
    console.log("브라우저와 연결 해제됨");
  });
  socket.send("hello!!!");

  socket.on("message", message => {
    console.log(message.toString("utf8"));
    sockets.forEach(aSocket => aSocket.send(message.toString("utf8")));
  });
});

server.listen(3020);
