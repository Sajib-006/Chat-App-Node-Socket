const io = require("socket.io")(3000);

const users = {};
io.on("connection", (socket) => {
  //console.log("hello client");
  //socket.emit("chat-message", "Hello world");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("from-client", (msg) => {
    //console.log(msg);
    socket.broadcast.emit("chat-message", msg);
  });
});
