var navToggle = document.querySelector(".main-navigation__toggle");
var navMenu = document.querySelector(".main-navigation__list");
var navLogo = document.querySelector(".main-navigation__wrapper");

navToggle.classList.add("main-navigation__toggle--js-visible");
navMenu.classList.add("main-navigation__list--js-hide");
navMenu.classList.add("main-navigation__list--transition-disabled");
navLogo.classList.add("main-navigation__wrapper--js-hide");

window.onload = function() {
  navMenu.classList.remove("main-navigation__list--transition-disabled");
};

navToggle.addEventListener("click", function() {
  if (navMenu.classList.contains("main-navigation__list--js-opened")) {
    navMenu.classList.remove("main-navigation__list--js-opened");
  } else {
    navMenu.classList.add("main-navigation__list--js-opened");
  }

  if (navToggle.classList.contains("main-navigation__toggle--js-closed")) {
    navToggle.classList.remove("main-navigation__toggle--js-closed");
  } else {
    navToggle.classList.add("main-navigation__toggle--js-closed");
  }

  if (navLogo.classList.contains("main-navigation__wrapper--js-hide")) {
    navLogo.classList.remove("main-navigation__wrapper--js-hide");
  } else {
    navLogo.classList.add("main-navigation__wrapper--js-hide");
  }
});
