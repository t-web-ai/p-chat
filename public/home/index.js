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