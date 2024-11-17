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
        <td><img src="${product.imagem}" alt="Imagem do produto" style="width: 50px; height: 50px;"></td>
        <td>${product.preco}</td>
        <td>${product.situacao}</td>
        <td>${product.tipo}</td>
        <td>${product.caracteristica1}</td>
        <td>${product.caracteristica2}</td>
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
    const imagemFile = document.querySelector('#imagem-produto').files[0];
    const preco = document.querySelector('#preco-produto').value;
    const situacao = document.querySelector('#situacao-produto').value;
    const tipo = document.querySelector('#tipo-produto').value;
    const caracteristica1 = document.querySelector('#caracteristica1-produto').value;
    const caracteristica2 = document.querySelector('#caracteristica2-produto').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imagem = e.target.result;

        if (editingId) {
            const productIndex = products.findIndex(product => product.id === editingId);
            if (productIndex !== -1) {
                products[productIndex] = { id: editingId, nome, imagem, preco, situacao, tipo, caracteristica1, caracteristica2 };
            }
            editingId = null;
        } else {
            const newProduct = {
                id: products.length + 1,
                nome,
                imagem,
                preco,
                situacao,
                tipo,
                caracteristica1,
                caracteristica2
            };
            products.push(newProduct);
        }

        renderTable();
        document.querySelector('#productForm').reset();
        document.querySelector('#preview-imagem').style.display = 'none'; 
    };

    if (imagemFile) {
        reader.readAsDataURL(imagemFile);
    } else if (editingId) {
        const product = products.find(product => product.id === editingId);
        if (product) {
            reader.onload({ target: { result: product.imagem } });
        }
    }
}

function editProduct(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        document.querySelector('#nome-produto').value = product.nome;
        document.querySelector('#preco-produto').value = product.preco;
        document.querySelector('#situacao-produto').value = product.situacao;
        document.querySelector('#tipo-produto').value = product.tipo;
        document.querySelector('#caracteristica1-produto').value = product.caracteristica1;
        document.querySelector('#caracteristica2-produto').value = product.caracteristica2;

        const previewImagem = document.querySelector('#preview-imagem');
        previewImagem.src = product.imagem;
        previewImagem.style.display = 'block';

        editingId = id;
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderTable();
}

    // Função para mostrar o preview da imagem quando o usuário seleciona um arquivo
    document.getElementById('imagem-produto').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-imagem').src = e.target.result;
                document.getElementById('preview-imagem').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Função para armazenar os dados no localStorage e redirecionar para outra página
    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura dos dados do formulário
        const produto = {
            nome: document.getElementById('nome-produto').value,
            preco: document.getElementById('preco-produto').value,
            situacao: document.getElementById('situacao-produto').value,
            tipo: document.getElementById('tipo-produto').value,
            caracteristica1: document.getElementById('caracteristica1-produto').value,
            caracteristica2: document.getElementById('caracteristica2-produto').value,
            imagem: document.getElementById('preview-imagem').src // A URL da imagem carregada
        };

        // Armazenar produto no localStorage
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        // Redirecionar para a página de exibição dos produtos
        window.location.href = "home.html";  // Altere para a URL da página onde os produtos são exibidos
    });

document.querySelector('#productForm').addEventListener('submit', addProduct);

renderTable();
