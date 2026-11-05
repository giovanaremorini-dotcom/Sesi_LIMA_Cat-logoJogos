const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gameverse"
});
conexao.connect(function(erro) {
    if (erro) {
        console.log("Erro ao conectar ao banco de dados:", erro);
        return;
    };
    console.log("Conectado ao banco de dados GameVerse!");
});
app.get("/listar", function(req, res) {
    const sql = "SELECT * FROM jogos";
    conexao.query(sql, function(erro, resultados) {
        if (erro) {
            console.log("Erro ao listar jogos:", erro);
            res.status(500).send("Erro ao listar jogos");
            return;
        };
        res.json(resultados);
    });
});
app.post("/cadastrar", function(req, res) {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const imagem_url = req.body.imagem_url;
    const sql = "INSERT INTO jogos (nome, categoria, descricao, imagem_url) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [nome, categoria, descricao, imagem_url], function(erro, resultado) {
        if (erro) {
            console.log("Erro ao cadastrar jogo:", erro);
            res.status(500).send("Erro ao cadastrar jogo");
            return;
        };
        res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso!",
            jogo_id: resultado.insertId
        });
    });
});
app.listen(3000, function() {
    console.log("Servidor GameVerse rodando em http://localhost:3000");
});