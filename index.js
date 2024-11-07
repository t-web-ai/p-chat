const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}...`);
});

app.use("/", express.static("./public/home"));
app.use("/", express.static("./public/font"));
app.get("*", (req, res)=>{
    res.redirect("/");
});

const socket = require("socket.io");
const io = socket(server);
io.on("connection", (socket)=>{});