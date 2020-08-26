const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("Enter userName:");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("user-connected", (name) => {
  //var foo = "bar";
  //console.log(`Let's meet at the ${foo}`);
  appendMessage(name + " conneted");
});

socket.on("user-exited", (name) => {
  //var foo = "bar";
  //console.log(`Let's meet at the ${foo}`);
  appendMessage(name + " left");
});

socket.on("chat-message", (data) => {
  //console.log(data);
  appendMessage(data.name + ": " + data.msg);
  //appendMessage("${data.name}: ${data.msg}");
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = messageInput.value;
  //console.log(msg);
  appendMessage("You: " + msg);
  socket.emit("from-client", msg);
  messageInput.value = "";
});

function appendMessage(msg) {
  const messageElement = document.createElement("div");
  messageElement.innerText = msg;
  messageContainer.append(messageElement);
}
