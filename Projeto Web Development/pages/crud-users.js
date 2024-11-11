let users = [];

let editingId = null;

function renderTable() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addUser(event) {
    event.preventDefault();
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    
    if (editingId) {
        const userIndex = users.findIndex(user => user.id === editingId);
        if (userIndex !== -1) {
            users[userIndex] = { id: editingId, nome, email };
        }
        editingId = null;
    } else {
        const newUser = {
            id: users.length + 1,
            nome,
            email
        };
        users.push(newUser);
    }
    
    renderTable();
    document.querySelector('#userForm').reset();
}

function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.querySelector('#nome').value = user.nome;
        document.querySelector('#email').value = user.email;
        editingId = id;
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderTable();
}

document.querySelector('#userForm').addEventListener('submit', addUser);

renderTable();
