import {loadTable} from "./loadTable.js";
import {table} from "./loadTable.js";

const form = document.querySelector('#newUserForm')
const navHomeTab = document.querySelector('#nav-home-tab')
const navProfileTab = document.querySelector('#nav-profile-tab')
const navTable = document.querySelector('#nav-home')
const navNewUser = document.querySelector('#nav-profile')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const newRole = document.querySelector('#newUserRole').value
    const newUsername = document.querySelector('#newUsername').value
    let addUser = {
        age: document.querySelector('#newUserAge').value,
        email: document.querySelector('#newUserEmail').value,
        username: newUsername,
        password: document.querySelector('#newUserPassword').value,
        roles: [
            {
                id: newRole === 'ROLE_ADMIN' ? 1 : 2,
                name: newRole
            }
        ]
    }
    fetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addUser)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('User added successfully');
            form.reset()
            navHomeTab.classList.add('active')
            navProfileTab.classList.remove('active')
            navTable.classList.add('show', 'active')
            navNewUser.classList.remove('active')
            table.innerHTML = ''
            loadTable()
        })
        .catch(error => {
            console.error('Error adding user', error);
        });
})
