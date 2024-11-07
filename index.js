const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`);
});

app.use("/", express.static("./public/home"));
app.use("/", express.static("./public/font"));
app.get("*", (req, res) => {
    res.redirect("/");
});

const socket = require("socket.io");
const io = socket(server);
let onlineUser = [];
io.on("connection", (socket) => {
    socket.on("start", username => {
        onlineUser.push({
            "id": socket.id,
            "name": username
        });
        io.emit("getOnlineUserCount", onlineUser.length);
    });

    socket.on("disconnect", () => {
        const userIndex = onlineUser.findIndex((v) => {
            return v.id == socket.id;
        });
        onlineUser.splice(userIndex, 1);
        io.emit("getOnlineUserCount", onlineUser.length);
    });
    socket.on("typing", (username)=>{
        socket.broadcast.emit("typing", username);
    });
    socket.on("sendMessage", messageInfo=>{
        io.emit("sendMessage", {
            "id": socket.id,
            "name": messageInfo.name,
            "message": messageInfo.message
        });
    })
});