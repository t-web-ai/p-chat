const socket = new io();
let username = document.forms[0].children[0];
let promptBox = document.querySelector(".prompt-name");
let onlineCount = document.querySelector(".online-users-count");
let messageBox = document.querySelector(".message-box");
let typing = document.querySelector(".typing");
let msg = document.forms[1].children[0];

document.forms[0].onsubmit = function () {
    if (username.value.trim()) {
        promptBox.classList.add("prompt-hide");
        socket.emit("start", username.value.trim());
        username.disabled = "disabled";
    }
    return false;
};
socket.on("getOnlineUserCount", count => {
    onlineCount.innerText = count + " online";
});
msg.onkeydown = function () {
    socket.emit("typing", username.value.trim());
};

let interval;
socket.on("typing", (username) => {
    if (interval)
        clearTimeout(interval);
    messageBox.style.flex = "80%";
    typing.style.flex = "5%";
    typing.innerText = `${username} is typing...`;
    interval = setTimeout(function () {
        messageBox.style.flex = "85%";
        typing.style.flex = "0%";
        typing.innerText = ``;
    }, 1000);
});

document.forms[1].onsubmit = function () {
    if (msg.value.trim()) {
        socket.emit("sendMessage", {
            "name": username.value.trim(),
            "message": msg.value.trim()
        });
        msg.value = "";
    }
    return false;
}
socket.on("sendMessage", messageInfo => {
    let row = document.createElement("DIV");
    row.classList.add("row");

    let msgFrame = document.createElement("DIV");
    let name;
    if (username.value.trim() == messageInfo.name) {
        row.classList.add("right");
        msgFrame.classList.add("msgFrame-you");
        name = document.createTextNode("You");
    } else {
        msgFrame.classList.add("msgFrame-other");
        name = document.createTextNode(messageInfo.name);
    }
    let userName = document.createElement("B");
    userName.appendChild(name);
    let userMessage = document.createElement("DIV");
    let message = document.createTextNode(messageInfo.message);
    userMessage.appendChild(message);
    msgFrame.appendChild(userName);
    msgFrame.appendChild(userMessage);
    row.appendChild(msgFrame);
    messageBox.appendChild(row);

    messageBox.scrollTop = messageBox.scrollHeight;
});