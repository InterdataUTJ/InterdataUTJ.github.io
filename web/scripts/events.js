// We need to add events again after the page is reloaded with view transitions.
function addEvents() {
  document.querySelector("img.menu-button-icon").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("nav-show");
  });

  document.querySelector("main").addEventListener("click", hideNav);
}

function hideNav() {
  document.querySelector("nav").classList.remove("nav-show");
}

function navIsShowed() {
  return document.querySelector("nav").classList.contains("nav-show");
}