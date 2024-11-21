// Carregar produtos ao abrir a página
document.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts() {
    try {
        const response = await fetch('/api/produtos'); // Rota para buscar todos os produtos
        const products = await response.json();

        const tableBody = document.getElementById('productTable').querySelector('tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de exibir os dados

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td><input type="text" value="${product.nome}" data-id="${product.id}" class="form-control edit-nome"></td>
                <td><input type="text" value="${product.imagem}" data-id="${product.id}" class="form-control edit-imagem"></td>
                <td><input type="number" step="0.01" value="${product.preco}" data-id="${product.id}" class="form-control edit-preco"></td>
                <td><input type="text" value="${product.situacao}" data-id="${product.id}" class="form-control edit-situacao"></td>
                <td><input type="text" value="${product.tipo}" data-id="${product.id}" class="form-control edit-tipo"></td>
                <td><input type="text" value="${product.caracteristica1}" data-id="${product.id}" class="form-control edit-caracteristica1"></td>
                <td><input type="text" value="${product.caracteristica2}" data-id="${product.id}" class="form-control edit-caracteristica2"></td>
                <td>
                    <button class="btn btn-success btn-sm save-product" data-id="${product.id}">Salvar</button>
                    <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adiciona evento de salvar em cada botão de salvar
        document.querySelectorAll('.save-product').forEach(button => {
            button.addEventListener('click', saveProduct);
        });

        // Adiciona evento de excluir em cada botão de excluir
        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', deleteProduct);
        });

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para salvar alterações de um produto
async function saveProduct(event) {
    const id = event.target.getAttribute('data-id');
    const nome = document.querySelector(`input.edit-nome[data-id='${id}']`).value;
    const imagem = document.querySelector(`input.edit-imagem[data-id='${id}']`).value;
    const preco = document.querySelector(`input.edit-preco[data-id='${id}']`).value;
    const situacao = document.querySelector(`input.edit-situacao[data-id='${id}']`).value;
    const tipo = document.querySelector(`input.edit-tipo[data-id='${id}']`).value;
    const caracteristica1 = document.querySelector(`input.edit-caracteristica1[data-id='${id}']`).value;
    const caracteristica2 = document.querySelector(`input.edit-caracteristica2[data-id='${id}']`).value;

    try {
        const response = await fetch(`/api/produto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, imagem, preco, situacao, tipo, caracteristica1, caracteristica2 })
        });

        const result = await response.json();
        if (result.success) {
            alert('Produto atualizado com sucesso!');
            loadProducts(); // Recarrega a lista de produtos
        } else {
            alert('Erro ao atualizar produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto');
    }
}

// Função para excluir um produto
async function deleteProduct(event) {
    const id = event.target.getAttribute('data-id');

    if (!confirm('Tem certeza que deseja excluir este produto?')) {
        return;
    }

    try {
        const response = await fetch(`/api/produto/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            alert('Produto excluído com sucesso!');
            loadProducts(); // Recarrega a lista de produtos
        } else {
            const result = await response.json();
            alert('Erro ao excluir produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
    }
}

document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Coleta os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const imagem = document.getElementById('imagem').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const situacao = document.getElementById('situacao').value;
    const tipo = document.getElementById('tipo').value;
    const caracteristica1 = document.getElementById('caracteristica1').value;
    const caracteristica2 = document.getElementById('caracteristica2').value;

    try {
        const response = await fetch('/api/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                imagem,
                preco,
                situacao,
                tipo,
                caracteristica1,
                caracteristica2
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('Produto cadastrado com sucesso!');
            document.querySelector('form').reset(); // Limpa o formulário após o envio
        } else {
            alert('Erro ao cadastrar o produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao cadastrar o produto');
    }
});
