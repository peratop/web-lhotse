var express = require('express');
var mysql = require('mysql2');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.json());

const port = 3000;
const router = express.Router();

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PUC@1234',
    database: 'web_lhotse'
});

// Rota para listar todos os usuários
router.get("/api/usuarios", (req, res) => {
    const sql = 'SELECT ID_Usuario AS id, Nome, Email FROM USUARIO';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ success: false, message: 'Erro ao buscar usuários', error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Rota POST para cadastrar usuário no banco de dados
router.post("/api/usuario", (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO USUARIO (Nome, Email, Senha) VALUES (?, ?, ?)';
    
    connection.query(sql, [nome, email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ success: false, message: 'Erro ao inserir usuário' });
        } else {
            const usuario = { id: results.insertId, nome, email };
            res.status(201).json({ success: true, usuario });
            console.log('Usuário inserido com sucesso, ID:', results.insertId);
        }
    });
});

// Rota DELETE para remover usuário do banco de dados pelo ID
router.delete("/api/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM USUARIO WHERE ID_Usuario = ?';
    
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir usuário:', err);
            res.status(500).json({ success: false, message: 'Erro ao excluir usuário' });
        } else {
            res.status(204).send(); // Retorna status 204 indicando que o usuário foi excluído
        }
    });
});

// Rota PUT para atualizar um usuário pelo ID
router.put("/api/usuario/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const sql = 'UPDATE USUARIO SET Nome = ?, Email = ? WHERE ID_Usuario = ?'; // Aqui está a correção

    connection.query(sql, [nome, email, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err.message);
            res.status(500).json({ success: false, message: 'Erro ao atualizar usuário', error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso' });
        }
    });
});



app.use(router);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
