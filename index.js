// import "./styles.css";

// eslint-disable-next-line no-undef
// if (process.env.NODE_ENV !== "production") {
//   console.log("Looks like we are in development mode!");
// }

//-- Set Variables to Access Form, Input Divs and Error Message Divs --//
const form = document.querySelector("form")

const email = document.getElementById("email")
const emailError = document.getElementById("email-error")

const country = document.getElementById("country")
const countryError = document.getElementById("country-error")

const postalCode = document.getElementById("postal-code")
const postalCodeError = document.getElementById("postal-code-error")

const password = document.getElementById("password")
const passwordError = document.getElementById("password-error")

const confirmPassword = document.getElementById("confirm-password")
const confirmPasswordError = document.getElementById("confirm-password-error")

//-- Add Regular Expression Variables for Each Input --//
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const countryRegExp = /^[a-zA-Z\s\-']+$/
const postalCodeRegExp = /^[\d\s\-]{3,10}$/
const strongPasswordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 
//-- Dynamically Update Input Validity and Generate Error Messages --//
const isValidInput = (input, regExp) => {
  const validity = input.value.length !== 0 && regExp.test(input.value);
  return validity;
};

const setInputClass = (inputDiv, validityStatus) => {
  inputDiv.className = validityStatus ? "valid" : "invalid";
};

const updateError = (thisInput, thisError, thisValidityStatus) => {
  if (thisValidityStatus) {
    thisError.textContent = "";
    thisError.removeAttribute("class");
  } else {
    if (thisInput === email) {
      thisError.textContent = 'Please enter a valid email address (e.g., "user@example.com").';
      thisError.setAttribute("class", "active");
    } else if (thisInput === country) {
      thisError.textContent = 'Please enter a valid country name using only letters, spaces, hyphens, and apostrophes (e.g., "United States", "United Kingdom", "Côte d\'Ivoire").';
      thisError.setAttribute("class", "active");
    } else if (thisInput === postalCode) {
      thisError.textContent = 'Please enter a valid postal code using only letters, numbers, spaces, and hyphens (3-10 characters long).';
      thisError.setAttribute("class", "active");
    } else if (thisInput === password) {
      thisError.textContent = 'Password must be at least 8 characters long and include: one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).';
      thisError.setAttribute("class", "active");
    } else if (thisInput === confirmPassword) {
      thisError.textContent = 'Passwords do not match.';
      thisError.setAttribute("class", "active");
    }
  }
};

const handleInput = (inputDiv, errorMessage, inputRegExp) => {
  const validity = isValidInput(inputDiv, inputRegExp);
  setInputClass(inputDiv, validity);
  updateError(inputDiv, errorMessage, validity);
};

//-- Separate Handlers for Password Confirmation --//

const isSecondPasswordValid = (input, firstPasswordValue) => {
  const validity = input.value.length !== 0 && input.value === firstPasswordValue;
  return validity;
};

const setConfirmPasswordClass = (confirmPasswordDiv, validityStatus) => {
  confirmPasswordDiv.className = validityStatus ? "valid" : "invalid";
};

const handleConfirmPasswordInput = (inputDiv, errorMessage) => {
  const validity = isSecondPasswordValid(inputDiv, password.value);
  setConfirmPasswordClass(inputDiv, validity);
  updateError(inputDiv, errorMessage, validity);
};

//-- Form-Level Event Handler That Considers All Inputs --//
const handleSubmit = (event) => {
  event.preventDefault();

  const emailValidity = isValidInput(email, emailRegExp);
  setInputClass(email, emailValidity);
  updateError(email, emailError, emailValidity);

  const countryValidity = isValidInput(country, countryRegExp);
  setInputClass(country, countryValidity);
  updateError(country, countryError, countryValidity);

  const postalCodeValidity = isValidInput(postalCode, postalCodeRegExp);
  setInputClass(postalCode, postalCodeValidity);
  updateError(postalCode, postalCodeError, postalCodeValidity);

  const passwordValidity = isValidInput(password, strongPasswordRegExp);
  setInputClass(password, passwordValidity);
  updateError(password, passwordError, passwordValidity);

  const confirmPasswordValidity = isSecondPasswordValid(confirmPassword, password.value);
  setConfirmPasswordClass(confirmPassword, confirmPasswordValidity);
  updateError(confirmPassword, emailError, emailValidity);

};

//-- Initialize Each Input's Validity --//
const emailValidity = isValidInput(email, emailRegExp);
setInputClass(email, emailValidity);

const countryValidity = isValidInput(country, countryRegExp);
setInputClass(country, countryValidity);

const postalCodeValidity = isValidInput(postalCode, postalCodeRegExp);
setInputClass(postalCode, postalCodeValidity);

const passwordValidity = isValidInput(password, strongPasswordRegExp);
setInputClass(password, passwordValidity);

const confirmPasswordValidity = isSecondPasswordValid(confirmPassword, password.value);
setConfirmPasswordClass(confirmPassword, confirmPasswordValidity);

//-- Add Event Listeners for Each Input --//

["input", "blur"].forEach(event => {
  email.addEventListener(event, () => {
    handleInput(email, emailError, emailRegExp);
  });
});

["input", "blur"].forEach(event => {
  country.addEventListener(event, () => {
    handleInput(country, countryError, countryRegExp);
  });
});

["input", "blur"].forEach(event => {
  postalCode.addEventListener(event, () => {
    handleInput(postalCode, postalCodeError, postalCodeRegExp);
  });
});

["input", "blur"].forEach(event => {
  password.addEventListener(event, () => {
    handleInput(password, passwordError, strongPasswordRegExp);
    handleConfirmPasswordInput(confirmPassword, confirmPasswordError);
  });
});

["input", "blur"].forEach(event => {
  confirmPassword.addEventListener(event, () => {
    handleConfirmPasswordInput(confirmPassword, confirmPasswordError);  
  });
});


form.addEventListener("submit", handleSubmit);