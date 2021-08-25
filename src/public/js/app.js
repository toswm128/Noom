const socket = new WebSocket("ws://" + window.location.host);

const messageList = document.querySelector("ul");
const messageFrom = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("서버에 연결됨");
});

socket.addEventListener("message", messsage => {
  console.log("서버에서 받은 메세지", messsage.data);
  const li = document.createElement("li");
  li.innerHTML = messsage.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("서버와 연결 해제됨");
});

messageFrom.addEventListener("submit", e => {
  e.preventDefault();
  const input = messageFrom.querySelector("#id");
  const inputName = messageFrom.querySelector("#name");
  socket.send("이름: " + inputName.value + "내용: " + input.value);
  input.value = "";
});
