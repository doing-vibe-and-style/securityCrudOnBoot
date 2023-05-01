export const table = document.querySelector("#table-body");
import {editButtonHandler} from "./editUser.js";
import {deleteButtonHandler} from "./deleteUser.js";

table.addEventListener('click', (event) => {
    if (event.target.closest('.edit-btn')) {
        editButtonHandler(event.target)
    } else if (event.target.closest('.delete-btn')) {
        deleteButtonHandler(event.target)
    }
})


export function loadTable() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const row = table.insertRow();
                row.insertCell().textContent = item.id;
                row.insertCell().textContent = item.username;
                row.insertCell().textContent = item.age;
                row.insertCell().textContent = item.email;
                row.insertCell().textContent = item.rolesString;
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn');
                editBtn.setAttribute('data-bs-toggle', 'modal');
                editBtn.id = item.id;
                editBtn.setAttribute('data-bs-target', '#modal-edit');
                row.insertCell().appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.setAttribute('data-bs-toggle', 'modal');
                deleteBtn.id = item.id;
                deleteBtn.setAttribute('data-bs-target', '#modal-delete');
                row.insertCell().appendChild(deleteBtn);
            });
        })
        .catch(error => console.error(error));
}

loadTable();