document.addEventListener("DOMContentLoaded", function () {

    // MENU TOGGLE (SAFE)
    let menu = document.querySelector('#menu-icon');
    let navmenu = document.querySelector('.navmenu');

    if (menu) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navmenu.classList.toggle('open');
        };
    }

    // CHAT TOGGLE
    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");

    if (chatToggle) {
        chatToggle.addEventListener("click", function () {
            chatContainer.style.display =
                chatContainer.style.display === "block" ? "none" : "block";
        });
    }

});

// SEND MESSAGE FUNCTION (GLOBAL)
function sendMessage() {
    let input = document.getElementById("chat-input");
    let msg = input.value.trim();

    if (!msg) return;

    let chatBox = document.getElementById("chat-box");

    // USER MESSAGE
    chatBox.innerHTML += `
        <div style="text-align:right; margin:5px;">
            <span style="background:#000; color:#fff; padding:6px 10px; border-radius:10px;">
                ${msg}
            </span>
        </div>
    `;

    // FETCH BOT RESPONSE
    fetch(`/chatbot/?message=${msg}`)
    .then(res => res.json())
    .then(data => {
        chatBox.innerHTML += `
            <div style="text-align:left; margin:5px;">
                <span style="background:#eee; padding:6px 10px; border-radius:10px;">
                    ${data.response}
                </span>
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(() => {
        chatBox.innerHTML += `<p style="color:red;">Error loading response</p>`;
    });

    input.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    const profile = document.querySelector(".profile-menu");
    const dropdown = document.querySelector(".profile-dropdown");

    profile.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", function () {
        dropdown.style.display = "none";
    });
});