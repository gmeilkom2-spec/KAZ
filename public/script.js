const socket = io();
const messages = document.getElementById("messages");

let username = "";
let verified = false;

function login() {
  const nameInput = document.getElementById("loginName").value.trim();
  if (!nameInput) {
    alert("Введите ник");
    return;
  }

  username = nameInput;

  if (username.toLowerCase() === "pypik") {
    verified = true;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  socket.emit("chat message", {
    user: username,
    verified: verified,
    text: text
  });

  input.value = "";
}

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>
      ${msg.user}
      ${msg.verified ? '<span class="badge"></span>' : ''}
    </strong>: ${msg.text}
  `;
  messages.appendChild(li);
});
