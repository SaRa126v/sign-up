// Regex.......................................

// ^: Anchors the start of the string.
// [A-Za-z\._\-0-9]*: Matches zero or more occurrences of any uppercase letter, lowercase letter, digit (0-9), underscore (_), period (.), or hyphen (-).
// [@]: Matches exactly one at symbol (@).
// [A-Za-z]*: Matches zero or more occurrences of any uppercase letter or lowercase letter.
// [\.]: Matches exactly one period (dot).
// [a-z]{2,4}: Matches two to four lowercase letters.
// $: Anchors the end of the string.

// It allows for a combination of uppercase letters, lowercase letters, digits, underscores, periods, and hyphens before the @ symbol.
// It requires exactly one @ symbol.
// It allows for a combination of uppercase letters and lowercase letters after the @ symbol (the domain name).
// It requires exactly one period (dot) after the domain name.
// It requires two to four lowercase letters after the period (representing the top-level domain such as .com, .org, .edu, etc.).
const emailRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

// [a-z]: Matches any lowercase letter from "a" to "z".
// [A-Z]: Matches any uppercase letter from "A" to "Z".
// +: Matches one or more occurrences of the preceding pattern (in this case, the letters).
const letterRegex = /[a-zA-Z]+/;

// ^: Anchors the start of the string.
// (?=.*[a-z]): Positive lookahead assertion to ensure that the string contains at least one lowercase letter.
// (?=.*[A-Z]): Positive lookahead assertion to ensure that the string contains at least one uppercase letter.
// (?=.*[0-9]): Positive lookahead assertion to ensure that the string contains at least one digit (0-9).
// (?=.*[!@#\$%\^&\*]): Positive lookahead assertion to ensure that the string contains at least one special character from the given set: !@#$%^&*.
// .{8,}: Matches any character (except newline) and ensures that the string has at least 8 or more characters.
// $: Anchors the end of the string.
const strongPassRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

// variables.....................................

// all inputs:
const inputs = document.querySelectorAll("input");
// submit button:
const submit = document.querySelector("#submitBtn");

// checkboxes & the whole form small tag:
const formMsg = document.querySelector("#formMsg");
const accountMsg = document.querySelector("#accountMsg");
const termsMsg = document.querySelector("#termsMsg");

// when user goes to the next input, the previous input should be checked........................................

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    // the value of input without extra space
    const value = input.value.trim();

    // the small tag of input
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
    }
  });
});

// checkbox validation..............................

// when submit button is clicked check if terms & account type are checked by the user
// show error if either of them is not checked

submit.addEventListener("click", (e) => {

  e.preventDefault();

  // the selected account type
  const checkedAccount = document.querySelector(
    'input[name="account-type"]:checked'
  );
  
// the checked terma & condition checkbox
  const terms = document.querySelector('input[name = "terms"]:checked');

  if (!checkedAccount) {
    wrong(accountMsg, accountError());
  } else if (!terms) {
    wrong(termsMsg, termsError());
  } else {
    accurator(accountMsg);
    accurator(termsMsg);
  }
});

// input validation....................................

// check name input
function namechecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError());
  } else if (givenValue.length > 20) {
    wrong(givenSmall, lengthError());
  } else if (!givenValue.match(letterRegex)) {
    wrong(givenSmall, regexError(letterRegex));
  } else {
    accurator(givenSmall);
  }
}

// check lastName input..................................
function lastNameChecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError());
  } else if (givenValue.length > 20) {
    wrong(givenSmall, lengthError());
  } else if (!givenValue.match(letterRegex)) {
    wrong(givenSmall, regexError(letterRegex));
  } else {
    accurator(givenSmall);
  }
}

// check email input..................................
function emailChecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError());
  } else if (givenValue.length > 30) {
    wrong(givenSmall, lengthError());
  } else if (!givenValue.match(emailRegex)) {
    wrong(givenSmall, regexError(emailRegex));
  } else {
    accurator(givenSmall);
  }
}

// check password input..............................
function passwordChecker(givenValue, givenSmall) {
  if (givenValue === "") {
    wrong(givenSmall, emptyError());
  } else if (givenValue.length > 30) {
    wrong(givenSmall, lengthError());
  } else if (!givenValue.match(strongPassRegex)) {
    wrong(givenSmall, regexError(strongPassRegex));
  } else {
    accurator(givenSmall);
  }
}

// accurate values...................................

function accurator(givenSmall) {
  givenSmall.textContent = "";
  // when submit btn is clicked it will proceed
  // submit.disabled == false;****************************************

}

// wrong values.......................................

function wrong(givenSmall, text) {
  givenSmall.textContent = text;
  // when submit btn is clicked it will not proceed
  // submit.disabled == true;
}

// 1) check if empty..................................

function emptyError() {
  return "Field cannot be empty";
}

// 2) check the length.................................

function lengthError() {
  return "It is too long";
}

// 3) check the Regex................................

function regexError(regex) {
  switch (regex) {
    case emailRegex:
      return "Enter a valid email address";

    case letterRegex:
      return "Use only letters";

    case strongPassRegex:
      return "Password is weak. Use: At least 8 charecters, UpperCase & LowerCase Letters, Numbers & Symbols";
  }
}

// 4) check account checkbox..........................
function accountError() {
  return "Check your account type!";
}

// 5) check terms checkbox.............................
function termsError() {
  return "Please check the terms and conditions box to proceed!";
}