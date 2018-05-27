var elems = form.elements;
var formButton = document.querySelector(".main-form__button");
var modalValid = document.querySelector(".modal--valid");
var modalInvalid = document.querySelector(".modal--invalid");
var modalButton = document.querySelector(".modal__button");

formButton.addEventListener("click", function() {
  if (elems.checkValidity()) {
    modalValid.classList.add("modal--js-open");
  } else {
    modalInvalid.classList.add("modal--js-open");
  }
});
