const form = document.getElementById('form');
var username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const inputs = document.getElementsByTagName('input');



// Show input error message
function showError(input, message) {
    /* add red border add class */
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    /* add error message small text */
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    /* add green border add class */
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// Check email is valid
function checkEmail(input) {
  
    const regexp = /^(\w[-._+\w]*\w@\w[-._\w]*\w\.\w{2,3})$/;
    if (regexp.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not invalid');
    }
}


// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        /* if empty - error */
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function getFieldName(input) {
    /* change to capital case */
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (!input1.value == input2.value) {
        showError(input2, 'Passwords do not match');
    }else{
        elem.style.borderColor = "#2ecc71";
    }

}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    
    //Save form fields in local storage.
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    localStorage.setItem("password2", password2.value);


    //Clear input's date when user submit the form.
    Array.from(inputs).map(input => {
        input.value = ""});

});

const elem = document.getElementById('password2');
elem.oninput = function(){
    if (password.value != password2.value){
        elem.style.borderColor = "red";
        elem.focus();
    }else{
        elem.style.borderColor = "#f0f0f0";
    }
}
