let products = [];
let editingId = null;

function renderTable() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nome}</td>
            <td>${product.preco}</td>
            <td>${product.descricao}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addProduct(event) {
    event.preventDefault();
    const nome = document.querySelector('#nome-produto').value;
    const preco = document.querySelector('#preco-produto').value;
    const descricao = document.querySelector('#descricao-produto').value;
    
    if (editingId) {
        const productIndex = products.findIndex(product => product.id === editingId);
        if (productIndex !== -1) {
            products[productIndex] = { id: editingId, nome, preco, descricao };
        }
        editingId = null;
    } else {
        const newProduct = {
            id: products.length + 1,
            nome,
            preco,
            descricao
        };
        products.push(newProduct);
    }
    
    renderTable();
    document.querySelector('#productForm').reset();
}

function editProduct(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        document.querySelector('#nome-produto').value = product.nome;
        document.querySelector('#preco-produto').value = product.preco;
        document.querySelector('#descricao-produto').value = product.descricao;
        editingId = id;
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderTable();
}

document.querySelector('#productForm').addEventListener('submit', addProduct);

renderTable();
