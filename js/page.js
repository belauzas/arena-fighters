"use strict";

import LocalStorage from './localStorage.js';

function Page() {
    const DB = new LocalStorage();

    const DOMbody = document.querySelector('body');

    let currentPage = 'login';
    const availablePaths = {
        login: ['login', 'army'],
        army: ['login', 'battle'],
        battle: ['login', 'army', 'battle-stats']
    }

    const loadPage = () => {
        DOMbody.dataset.page = currentPage;
    }

    Object.defineProperty(this, 'current', {
        get() {
            return currentPage;
        },
        set(page) {
            if ( availablePaths[currentPage].includes(page) ) {
                currentPage = page;
                loadPage();
            }
        }
    });
}

export default Page;