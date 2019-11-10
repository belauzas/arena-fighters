"use strict";

(function(){

const input = document.querySelector('input');
const button = document.querySelector('.btn');

// false - register; true - login
let action = false;

let currentUsers = localStorage.getItem('arena-users');
if ( currentUsers ) {
    currentUsers = JSON.parse(currentUsers);
} else {
    currentUsers = [];
}

const isAvailable = () => {
    const username = input.value;

    if ( username && currentUsers.length > 0 ) {
        if ( currentUsers.filter(u => u.username === username).length ) {
            action = true;
        } else {
            action = false;
        }
    } else {
        action = false;
    }

    return button.textContent = action ? 'Login' : 'Register';
}

const login = () => {
    const username = input.value;

    if ( !username ) {
        return;
    }

    if ( action ) {
        // login
    } else {
        // register
        const user = {
            username: username
        }
        currentUsers.push(user);
        localStorage.setItem('arena-users', JSON.stringify(currentUsers));
        isAvailable();
    }
    
}

input.addEventListener('keyup', isAvailable);

button.addEventListener('click', login);

})();