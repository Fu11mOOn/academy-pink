'use strict';

(function () {
  var navToggle = document.querySelector('.main-navigation__toggle');
  var navMenu = document.querySelector('.main-navigation__list');
  var navLogo = document.querySelector('.main-navigation__wrapper');

  var toggleClasses = function (element, elementClass) {
    if (element.classList.contains(elementClass)) {
      element.classList.remove(elementClass);
    } else {
      element.classList.add(elementClass);
    }
  };

  navToggle.classList.add('main-navigation__toggle--js-visible');
  navMenu.classList.add('main-navigation__list--js-hide');
  navMenu.classList.add('main-navigation__list--transition-disabled');
  navLogo.classList.add('main-navigation__wrapper--js-hide');
  window.onload = function () {
    navMenu.classList.remove('main-navigation__list--transition-disabled');
  };
  navToggle.addEventListener('click', function () {
    toggleClasses(navMenu, 'main-navigation__list--js-opened');
    toggleClasses(navToggle, 'main-navigation__toggle--js-closed');
    toggleClasses(navLogo, 'main-navigation__wrapper--js-hide');
  });
})();
