"use strict";

import LocalStorage from './localStorage.js';
import Page from './page.js';

const DB = new LocalStorage();
const page =  new Page();

if ( DB.userLoggedIn() ) {
    page.current = 'army';
} else {
    page.current = 'login';
}
