var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'pages')));

const port = 3000;
const router = express.Router();
app.use(express.json());

var usuarios = [];

router.get("/api/usuario", (req, res) => {
    console.log("Entrou no /api/usuario");
    res.status(200).json(usuarios);
});

router.post("/api/usuario", (req, res) => {
    const usuario = req.body;
    console.log(usuario);
    usuario.id = usuarios.length + 1;
    usuarios.push(usuario);
    res.status(201).json(usuario);
});

router.delete("/api/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(p => p.id !== id);
    res.status(204).send();
    console.log("Usuário excluído com sucesso:", id);
});

app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
