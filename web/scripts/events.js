// We need to add events again after the page is reloaded with view transitions.
function addEvents() {
  window.screen.orientation.addEventListener("change", hideNav);
  window.addEventListener('resize', hideNav);
  document.querySelector('main').addEventListener('click', hideNav);
  document.querySelector('img.menu-button-icon').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('nav-show');
  });
}

function hideNav() {
  document.querySelector('nav').classList.remove('nav-show');
}

function navIsShowed() {
  return document.querySelector('nav').classList.contains('nav-show');
}