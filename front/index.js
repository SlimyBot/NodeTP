document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const cross = document.querySelector(".cross");
  const navbar = document.querySelector(".navbar");

  cross.style.display = "none";
  burger.style.display = "flex";

  cross.addEventListener("click", function () {
    navbar.style.transform = "translateX(250px)";

    burger.style.display = "flex";
    cross.style.display = "none";
  });

  burger.addEventListener("click", function () {
    navbar.style.transform = "translateX(-250px)";

    cross.style.display = "flex";
    burger.style.display = "none";
  });

  const loginButton = document.querySelector(".navbar button");
  if(getCookie("session") != "") {
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
  }
  
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}