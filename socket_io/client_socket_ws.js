
const socket = new WebSocket("ws://localhost:3000");

const formElement = document.getElementById("form");
const messageElement = document.getElementById("messages");
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const message = e.target.message.value.trim();
    console.log({ name, message })
    if (name === "" || message === "") {
        return;
    }
    socket.send(JSON.stringify({ name, message }))

});

function writeLine(text) {
    const line = document.createElement("p");
    line.innerText = text;
    messageElement.appendChild(line)
}



socket.onmessage = e => {

    writeLine(e.data);
}

