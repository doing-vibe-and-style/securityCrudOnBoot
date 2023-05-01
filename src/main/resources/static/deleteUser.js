const deleteBtnClose = document.querySelector('#deleteBtnClose');
const deleteModal = document.querySelector(`#modal-delete`);
const modalDelete = new bootstrap.Modal(deleteModal);

deleteBtnClose.addEventListener("click", () => {
    modalDelete.hide();
})

export function deleteButtonHandler(node) {
    const row = node.closest('tr');
    const userId = row.cells[0].textContent;
    const userName = row.cells[1].textContent;
    const userAge = row.cells[2].textContent;
    const userEmail = row.cells[3].textContent;

    const deleteUserIdInput = deleteModal.querySelector(`#deleteId`);
    const deleteUserNameInput = deleteModal.querySelector(`#deleteUsername`);
    const deleteUserAgeInput = deleteModal.querySelector(`#deleteAge`);
    const deleteUserEmailInput = deleteModal.querySelector(`#deleteEmail`);
    deleteUserIdInput.value = userId;
    deleteUserNameInput.value = userName;
    deleteUserAgeInput.value = userAge;
    deleteUserEmailInput.value = userEmail;

    const modalDeleteBtn = deleteModal.querySelector('#modalDeleteBtn')
    modalDeleteBtn.addEventListener('click', (event) => {
        event.preventDefault()
        fetch(`/api/users/` + userId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                console.log('User with id=' + userId + ' deleted')
                modalDelete.hide();
                row.remove()
            })
            .catch(error => console.error(error));
    });
}
