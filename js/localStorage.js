"use strict";

function DB() {
    let users = localStorage.getItem('arenaUsers');
    let currentUser = localStorage.getItem('arenaCurrentUser');
    let usersList = JSON.parse(users) || [];
    let page = 'login';

    this.currentPage = () => {
        localStorage.getItem('arenaUsers')
        return page;
    }

    this.login = (username) => {
        currentUser = username;
        localStorage.setItem('arenaCurrentUser', currentUser);
    }

    this.userExists = (username) => {
        return usersList.includes(username);
    }

    this.registerUser = (username) => {
        if ( this.userExists(username) ) return false;

        usersList = [...usersList, username];
        localStorage.setItem('arenaUsers', JSON.stringify(usersList));

        const user = {
            username: username,
            currentPage: 'login'
        }
        localStorage.setItem('arenaUser'+username, JSON.stringify(user));
        return this.login(username);
    }

    this.userLoggedIn = () => {
        const loggedInUser = localStorage.getItem('arenaCurrentUser');
        return this.userExists(loggedInUser);
    }
}

export default DB;