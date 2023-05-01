const aboutUserTable = document.querySelector('#about-user-table')

function loadAboutUserTable() {
    fetch('/api/users/me')
        .then(response => response.json())
        .then(data => {
            const row = aboutUserTable.insertRow()
            row.insertCell().textContent = data.id
            row.insertCell().textContent = data.username
            row.insertCell().textContent = data.age
            row.insertCell().textContent = data.email
            row.insertCell().textContent = data.rolesString
        })
        .catch(error => console.error(error))
}

loadAboutUserTable()
