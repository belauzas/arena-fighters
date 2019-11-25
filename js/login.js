"use strict";

import LocalStorage from './localStorage.js';
import Page from './page.js';

(function() {
    const DB = new LocalStorage();
    const page =  new Page();

    const loginPage = document.querySelector('.page.page-login');
    const input = loginPage.querySelector('input');
    const button = loginPage.querySelector('.btn');

    const isAvailable = () => {
        const username = input.value;
        return button.textContent = DB.userExists(username) ? 'Login' : 'Register';
    }

    const login = () => {
        const username = input.value;
        if ( !username ) return false;

        // login or register user
        if ( DB.userExists(username) ) {
            DB.login(username);
            page.current = 'army';
        } else {
            DB.registerUser(username);
            isAvailable();
        }
    }

    input.addEventListener('keyup', isAvailable);
    button.addEventListener('click', login);
})();