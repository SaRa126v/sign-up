// variables.....................................

// all inputs:
const inputs = document.querySelectorAll("input");
// submit button:
const submit = document.querySelector("#submitBtn");
// checked checkboxes:
const checkedAccount = document.querySelector(
  'input[name="account-type"]:checked'
);
const terms = document.querySelector('input[name = "terms"]:checked');
// checkboxes small tags:
const accountError = document.querySelector("#accountError");
const termsError = document.querySelector("#termsError");

// Regex.......................................

const emailRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

const letterRegex = /[a-zA-Z]+/;

const strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;


// when user goes to the next input, the previous input should be checked........................................

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    // the value of input without extra space
    const value = input.value.trim();

    // the small of input
    const small = input.nextElementSibling;

    switch (input.id) {
      case "name":
        // check it
        namechecker(value, small);
        break;

      case "lastName":
        // check it
        lastNameChecker(value, small);
        break;

      case "email":
        // check it
        emailChecker(value, small);
        break;

      case "password":
        // check it
        passwordChecker(value, small);
        break;

      case "profile":
        // check it
        profileChecker(value, small);
        break;

      case "age":
        // check it
        ageChecker(value, small);
        break;
    }
  });
});

// checkbox validation..............................

// when submit button is clicked check if terms & account type are checked by the user
// show error if either of them is not checked

submit.addEventListener("click", () => {
  if (!checkedAccount) {
    accountError.textContent = "Check your account type!";
    console.log(checkedAccount);
  } else if (!terms) {
    termsError.textContent =
      "Please check the terms and conditions box to proceed!";
    console.log(terms);
  }
  // why cant i use checkedAccount.value or terms.value***********************************
});

// input validation....................................

// check name input
function namechecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError())
  } else if (givenValue.length > 20) {
    wrong(givenSmall, lengthError())
  } else if (!givenValue.match(letterRegex)) {
    wrong(givenSmall, regexError(letterRegex))
  } else {
    accurator(givenSmall);
  }
}

// check lastName input..................................
function lastNameChecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError())
  } else if (givenValue.length > 20) {
    wrong(givenSmall, lengthError())
  } else if (!givenValue.match(letterRegex)) {
    wrong(givenSmall, regexError(letterRegex))
  } else {
    accurator(givenSmall);
  }
}

// check email input..................................
function emailChecker(givenValue, givenSmall) {

  if (givenValue === "") {
    wrong(givenSmall, emptyError())
  } else if (givenValue.length > 30) {
    wrong(givenSmall, lengthError())
  } else if (!givenValue.match(emailRegex)) {
    wrong(givenSmall, regexError(emailRegex))
  } else {
    accurator(givenSmall);
  }
}

// check password input..................................
function passwordChecker(givenValue, givenSmall) {

  if (givenValue === "") {
    wrong(givenSmall, emptyError())
  } else if (givenValue.length > 30) {
    wrong(givenSmall, lengthError())
  } else if (!givenValue.match(strongPassRegex)) {
    wrong(givenSmall, regexError(strongPassRegex))
  } else {
    accurator(givenSmall);
  }
}

// check account checkbox...............................
function accountChecker() {

}

// check terms checkbox..................................
function termsChecker() {

}


// check profile input..................................
function profileChecker() {

}

// check age input..................................
function ageChecker() {

}

// accurate values...................................

function accurator(givenSmall) {
  givenSmall.textContent = "";
  givenSmall.classList.add("accurate");
}

// wrong values.......................................

function wrong(givenSmall, text) {
  document.querySelector(".accurate")?.remove();
  givenSmall.textContent = text;
}


// 1) check if empty..................................

function emptyError() {
  return"Field cannot be empty";
}

// 2) check the length.................................

function lengthError() {
  return "It is too long";
}

// 3) check the Regex..................................

function regexError(regex) {

  switch (regex) {
    case emailRegex:
      return "Enter a valid email address"
  
      case letterRegex:
     return "Use only letters"

     case strongPassRegex:
      return "Password is weak. Use: At least 8 charecters, UpperCase & LowerCase Letters, Numbers & Symbols"
  }
}
