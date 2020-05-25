(function() {
    const sendBtn = document.getElementById("send");
    const msgBox = document.getElementById("messageBox");
    const messages = document.getElementById("message");

    let ws;

    function showMessage(message) {
        messages.innerHTML += `\n${message}`;
        console.log(message);
    }

    function init() {
        if (ws) {
            ws.onerror = ws.onopen = onclose = null;
            ws.close();
        }

        ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("Connection opened");
        }
        ws.onmessage = ({
            data,
        }) => {
            showMessage(data);
        }
        ws.onclose = function() {
            ws = null;
        }
    }

    sendBtn.onclick = function() {
        if (!ws) {
            showMessage("No connection");
            return;
        }

        ws.send(msgBox.value);
        showMessage(msgBox.value);
    }

    init();
})();