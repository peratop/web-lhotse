document.addEventListener('DOMContentLoaded', () => {
    // Carrega os usuários na tabela ao carregar a página
    loadUsers();
    
    // Função para carregar e exibir usuários na tabela
    async function loadUsers() {
        try {
            const response = await fetch('/api/usuarios'); // Rota para buscar todos os usuários
            const users = await response.json();
            
            const tableBody = document.getElementById('userTable').querySelector('tbody');
            tableBody.innerHTML = ''; // Limpa a tabela antes de exibir os dados
            
            users.forEachs(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td><input type="text" value="${user.Nome}" data-id="${user.id}" class="form-control edit-name"></td>
                    <td><input type="email" value="${user.Email}" data-id="${user.id}" class="form-control edit-email"></td>
                    <td>
                        <button class="btn btn-success btn-sm save-user" data-id="${user.id}">Salvar</button>
                        <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Adiciona evento de salvar em cada botão de salvar
            document.querySelectorAll('.save-user').forEach(button => {
                button.addEventListener('click', saveUser);
            });

            // Adiciona evento de excluir em cada botão de excluir
            document.querySelectorAll('.delete-user').forEach(button => {
                button.addEventListener('click', deleteUser);
            });
            
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }
    
    // Função para salvar alterações de um usuário
    async function saveUser(event) {
        const id = event.target.getAttribute('data-id');
        const nome = document.querySelector(`input.edit-name[data-id='${id}']`).value;
        const email = document.querySelector(`input.edit-email[data-id='${id}']`).value;
        
        try {
            const response = await fetch(`/api/usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email })
            });
            
            const result = await response.json();
            if (result.success) {
                alert('Usuário atualizado com sucesso!');
                loadUsers(); // Recarrega a lista de usuários
            } else {
                alert('Erro ao atualizar usuário: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário');
        }
    }

    // Função para excluir um usuário
    async function deleteUser(event) {
        const id = event.target.getAttribute('data-id');
        
        if (!confirm('Tem certeza que deseja excluir este usuário?')) {
            return;
        }
        
        try {
            const response = await fetch(`/api/usuario/${id}`, {
                method: 'DELETE'
            });
            
            if (response.status === 204) {
                alert('Usuário excluído com sucesso!');
                loadUsers(); // Recarrega a lista de usuários
            } else {
                const result = await response.json();
                alert('Erro ao excluir usuário: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário');
        }
    }
});
