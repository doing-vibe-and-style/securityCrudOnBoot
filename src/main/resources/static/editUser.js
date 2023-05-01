const editBtnClose = document.querySelector('#editBtnClose');
const editModal = document.querySelector(`#modal-edit`);
const modalEdit = new bootstrap.Modal(editModal);

editBtnClose.addEventListener("click", () => {
    modalEdit.hide();
})

export function editButtonHandler(node) {
    const row = node.closest('tr');
    const userId = row.cells[0].textContent;
    const userName = row.cells[1].textContent;
    const userAge = row.cells[2].textContent;
    const userEmail = row.cells[3].textContent;
    const userRole = row.cells[4].textContent;

    const editUserIdInput = editModal.querySelector(`#idEditUser`);
    const editUserNameInput = editModal.querySelector(`#editUsername`);
    const editUserAgeInput = editModal.querySelector(`#editAge`);
    const editUserEmailInput = editModal.querySelector(`#editEmail`);
    const editUserRoleInput = editModal.querySelector(`#editUserRoles`);
    const userPassword = editModal.querySelector('#userPassword')
    editUserIdInput.value = userId;
    editUserNameInput.value = userName;
    editUserAgeInput.value = userAge;
    editUserEmailInput.value = userEmail;
    editUserRoleInput.value = userRole;

    const editSaveBtn = editModal.querySelector('#modalEditBtn');
    editSaveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const newUserName = editUserNameInput.value;
        const newUserAge = editUserAgeInput.value;
        const newUserEmail = editUserEmailInput.value;
        const newUserRoles = editUserRoleInput.value;
        const password = userPassword.value;
        const id = userId;

        if (!newUserName || !newUserAge || !newUserEmail || !newUserRoles) {
            alert('Please fill out all required fields');
            return;
        }

        let editUser = {
            id,
            username: newUserName,
            age: newUserAge,
            email: newUserEmail,
            password,
            roles: [
                {
                    id: newUserRoles === 'ROLE_ADMIN' ? 1 : 2,
                    name: newUserRoles
                }
            ]
        };

        fetch(`/api/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editUser)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                row.cells[1].textContent = data.username;
                row.cells[2].textContent = data.age;
                row.cells[3].textContent = data.email;
                row.cells[4].textContent = data.rolesString;
                modalEdit.hide();
            })
            .catch(error => console.error(error));
    });
}