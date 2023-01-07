// DOM Elements:
const messagesList = document.getElementById("messages-list");
const messageBox = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");

let wsConnection;

sendBtn.onclick = function () {
  if (!wsConnection) {
    alert("NO Connection. Is the server running? 🤓");
    return;
  }

  wsConnection.send(messageBox.value);
  renderMessages(messageBox.value);
};

const renderMessages = (message) => {
  const li = document.createElement("li");
  li.textContent = message;
  messagesList.appendChild(li);
  messageBox.value = "";
};

const initWS = () => {
  if (wsConnection) {
    wsConnection.onerror = ws.onopen = ws.onclose = null;
    wsConnection.close();
  }

  wsConnection = new WebSocket("ws://localhost:3000");
  wsConnection.onopen = () => {
    console.log("We are after UPGRADE and ready to go!!!");
  };
  wsConnection.onmessage = ({ data }) => renderMessages(data);

  wsConnection.onclose = function () {
    console.log("Time to die :(");
    wsConnection = null;
  };
};

initWS();
