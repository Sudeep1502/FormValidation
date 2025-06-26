// Select elements
const form = document.getElementById('signup-form');
const formTitle = document.getElementById('form-title');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submitBtn = form.querySelector('button[type="submit"]');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');

let isLoginMode = false;

// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
  const small = formControl.querySelector('small');
  small.innerText = '';
}

// Validate email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Form validation check
function isFormValid() {
  const controls = document.querySelectorAll('.form-control');
  for (let control of controls) {
    if (control.style.display !== 'none' && !control.classList.contains('success')) {
      return false;
    }
  }
  return true;
}

// Real-time validation
function addInputEvents() {
  username.addEventListener('input', validateForm);
  email.addEventListener('input', validateForm);
  password.addEventListener('input', validateForm);
  password2.addEventListener('input', validateForm);
}

function validateForm() {
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();
  const usernameVal = username.value.trim();
  const password2Val = password2.value.trim();

  if (!isLoginMode) {
    if (usernameVal === '') {
      showError(username, 'Username is required');
    } else if (usernameVal.length < 3 || usernameVal.length > 15) {
      showError(username, 'Username must be 3-15 characters');
    } else {
      showSuccess(username);
    }

    if (password2Val === '') {
      showError(password2, 'Please confirm your password');
    } else if (password2Val !== passwordVal) {
      showError(password2, 'Passwords do not match');
    } else {
      showSuccess(password2);
    }
  }

  if (emailVal === '') {
    showError(email, 'Email is required');
  } else {
    checkEmail(email);
  }

  if (passwordVal === '') {
    showError(password, 'Password is required');
  } else if (passwordVal.length < 6 || passwordVal.length > 25) {
    showError(password, 'Password must be 6-25 characters');
  } else {
    showSuccess(password);
  }

  submitBtn.disabled = !isFormValid();
}

// Handle form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (isLoginMode) {
    alert('Logged in successfully!');
  } else {
    alert('Registration successful!');
  }

  form.reset();
  clearAllStates();
  submitBtn.disabled = true;
});

// Clear form validation
function clearAllStates() {
  document.querySelectorAll('.form-control').forEach(control => {
    control.classList.remove('error', 'success');
    control.querySelector('small').innerText = '';
  });
}

// Toggle Login / Signup
toggleLink.addEventListener('click', function (e) {
  e.preventDefault();
  isLoginMode = !isLoginMode;

  if (isLoginMode) {
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Login';
    toggleText.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign Up';
    username.parentElement.style.display = 'none';
    password2.parentElement.style.display = 'none';
  } else {
    formTitle.textContent = 'Sign Up';
    submitBtn.textContent = 'Register';
    toggleText.textContent = 'Already have an account?';
    toggleLink.textContent = 'Login';
    username.parentElement.style.display = 'block';
    password2.parentElement.style.display = 'block';
  }

  form.reset();
  clearAllStates();
  submitBtn.disabled = true;
});

// Init
addInputEvents();
