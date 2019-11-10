"use strict";

(function(){

const version = 1;

const localVersion = parseInt(localStorage.getItem('arena-version'));

if ( !localVersion || localVersion < version ) {
    localStorage.removeItem('arena-users');
    localStorage.setItem('arena-version', version);
}

})();