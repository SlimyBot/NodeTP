// First add the getCookie helper function
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return "";
}

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector(".header .button");
    if(getCookie("session") !== "") {
        loginButton.textContent = "Déconnexion";
        loginButton.addEventListener("click", function () {
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";
            window.location.reload();
        });
    }
    else {
        loginButton.textContent = "Se connecter";
        loginButton.addEventListener("click", function () {
            window.location.href = "login.html";
        }); 
        const playButton = document.querySelector(".play-button");
        playButton.addEventListener("click", launchCanvasGame);
    }
});

function launchCanvasGame() {
    const canvasGame = document.getElementById("canvas-game");
    canvasGame.classList.add("active");
    const closeButton = document.querySelector(".close-button");
    closeButton.classList.add("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");

    const body = document.querySelector("body");
    body.style.overflow = "hidden";

    // Focus on the canvas
    canvasGame.focus();
}

function closeCanvasGame() {
    const canvasGame = document.getElementById("canvas-game");
    canvasGame.classList.remove("active");
    const closeButton = document.querySelector(".close-button");
    closeButton.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");

    const body = document.querySelector("body");
    body.style.overflow = "auto";

    // Unfocus the canvas
    canvasGame.blur();
}