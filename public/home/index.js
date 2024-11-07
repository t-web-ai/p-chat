const socket = new io();
let username = document.forms[0].children[0];
let promptBox = document.querySelector(".prompt-name");
let onlineCount = document.querySelector(".online-users-count");
let messageBox = document.querySelector(".message-box");
let typing = document.querySelector(".typing");
let msg = document.forms[1].children[0];