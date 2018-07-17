'use strict';

(function () {
  var OPENED_CLASS = 'modal--js-open';

  var form = document.querySelector('.main-form__form');
  var submitButton = form.querySelector('.main-form__button');
  var validModal = form.querySelector('.modal--valid');
  var invalidModal = form.querySelector('.modal--invalid');
  var modalButtons = form.querySelectorAll('.modal__button');

  submitButton.addEventListener('click', function (evt) {
    if (form.checkValidity()) {
      evt.preventDefault();
      form.reset();
      validModal.classList.add(OPENED_CLASS);
    } else {
      invalidModal.classList.add(OPENED_CLASS);
    }
  });
  modalButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      form.querySelector('.modal--js-open').classList.remove(OPENED_CLASS);
    });
  });
})();
