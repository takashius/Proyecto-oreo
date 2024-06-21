import { createNotification } from '../components/notification.js';

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const telefonoInput = document.querySelector('#telefono-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const select = document.querySelector('#selector');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

// Regex validacion 

const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/
const NAME_VALIDATION = /^[A-Z][a-z ]*[A-Z][a-z]*$/
const TLF_VALIDATION = /^[0-9].{6}$/

// Validaciones
let emailValidation = false;
let passwordValidation = false;
let nameValidation = false;
let tlfValidation = false;

// funcion
const validacion = (input, regexValidation) => {

    formBtn.disabled = nameValidation && emailValidation && passwordValidation && tlfValidation ? false : true;

    if (input.value === '') {
        input.classList.remove('outline-green-500', 'outline-2');
        input.classList.remove('outline-red-500', 'outline-2');
        input.classList.add('outline');
    } else if (regexValidation) {
        input.classList.add('outline-green-500', 'outline-2');
    } else {
        input.classList.remove('outline-green-500', 'outline-2');
        input.classList.add('outline-red-500', 'outline-2');
    }
};
          

// eventos
nameInput.addEventListener('input', e => {
     nameValidation = NAME_VALIDATION.test(e.target.value);
    validacion(nameInput, nameValidation)
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
   validacion(emailInput, emailValidation)
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
   validacion(passwordInput, passwordValidation)
});

telefonoInput.addEventListener('input', e => {
    tlfValidation = TLF_VALIDATION.test(e.target.value);
   validacion(telefonoInput, tlfValidation)
});


form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            selector: select.value,
            telefono: telefonoInput.value,
            password: passwordInput.value,
            
        }
        console.log(newUser);
        const { data } = await axios.post('/api/users', newUser);
        createNotification(false, data);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000);

        nameInput.value = '';
        emailInput.value = '';
        telefonoInput.value = '';
        passwordInput.value = '';
        validacion(nameInput, false);
        validacion(emailInput, false);
        validacion(select, false);
        validacion(telefonoInput, false);
        validacion(passwordInput, false);
        
        

    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000)
        
    }
});