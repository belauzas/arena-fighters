"use strict";

(function(){

const VERSION = '1.0.1';

const versionMap = VERSION.split('.').map(n=>parseInt(n));
const localVersion = localStorage.getItem('arenaVersion');
let localVersionMap = null;
if ( localVersion ) {
    localVersionMap = localVersion.split('.').map(n=>parseInt(n));
}

if ( !localVersionMap ||
     localVersionMap[0] < versionMap[0] ||
     localVersionMap[1] < versionMap[1] ||
     localVersionMap[2] < versionMap[2] ) {
    // logging out current user
    localStorage.removeItem('arenaCurrentUser');

    // removing all registered users data
    let users = localStorage.getItem('arenaUsers');
    
    if ( users && typeof(users) === 'string' ) {
        users = JSON.parse(users);
        for ( let i=0; i<users.length; i++ ) {
            localStorage.removeItem('arenaUser'+users[i]);
        }
    }
    localStorage.removeItem('arenaUsers');

    // updating version
    localStorage.setItem('arenaVersion', VERSION);
}

})();