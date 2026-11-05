const API_URL = "http://localhost:3000";

const filtros = document.querySelectorAll(".filtro");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const modal = document.getElementById("modalCadastro");
const form = document.getElementById("formJogo");
const lista = document.getElementById("lista-jogos");

let categoriaSelecionada = "Todos";
btnCadastrar.addEventListener("click", function() {
    modal.showModal();
});
btnCancelar.addEventListener("click", function() {
    modal.close();
});
function criarCard(nome, categoria, descricao, imagem) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.categoria = categoria;

    const capa = document.createElement("div");
    capa.classList.add("imagem-jogo");

    const imagemJogo = document.createElement("img");
    imagemJogo.src = imagem;
    imagemJogo.alt = nome;

    capa.appendChild(imagemJogo);

    const conteudo = document.createElement("div");
    conteudo.classList.add("card-conteudo");

    const genero = document.createElement("span");
    genero.classList.add("genero");
    genero.textContent = categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = descricao;
    conteudo.append(genero, titulo, texto);
    card.append(capa, conteudo);
    lista.appendChild(card);
}
async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + "/listar");
        const jogos = await resposta.json();
        jogos.forEach(function(jogo) {
            criarCard(
                jogo.nome,
                jogo.categoria,
                jogo.descricao,
                jogo.imagem_url
            );
        });
        filtrarJogos();
    } catch (erro) {
        console.log("Erro ao carregar jogos:", erro);
        mensagem.textContent = "Não foi possível carregar os jogos do banco de dados.";}
}
form.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    const novoJogo = {
        nome: document.getElementById("nome").value.trim(),
        categoria: document.getElementById("categoria").value,
        descricao: document.getElementById("descricao").value.trim(),
        imagem_url: document.getElementById("imagem_url").value.trim()
    };
    try {
        const resposta = await fetch(API_URL + "/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        });
        if (resposta.ok) {
            criarCard(
                novoJogo.nome,
                novoJogo.categoria,
                novoJogo.descricao,
                novoJogo.imagem_url
            );
            form.reset();
            modal.close();
            filtrarJogos();
            alert("Jogo cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar jogo. Verifique o servidor e o banco de dados.");
        }
    } catch (erro) {
        console.log("Erro na requisição:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
});
function filtrarJogos() {
    const jogos = document.querySelectorAll(".card");
    const texto = pesquisa.value.toLowerCase();
    let quantidade = 0;
    jogos.forEach(function(jogo) {
        const nome = jogo.querySelector("h3").textContent.toLowerCase();
        const categoria = jogo.dataset.categoria;
        const correspondeNome = nome.includes(texto);
        const correspondeCategoria =
            categoriaSelecionada === "Todos" ||
            categoria === categoriaSelecionada;
        if (correspondeNome && correspondeCategoria) {
            jogo.style.display = "block";
            quantidade++;
        } else {
            jogo.style.display = "none";
        }
    });
    if (quantidade === 0) {
        mensagem.textContent = "Nenhum jogo encontrado.";
    } else {
        mensagem.textContent = "";}
}
pesquisa.addEventListener("input", filtrarJogos);
filtros.forEach(function(filtro) {
    filtro.addEventListener("click", function() {
        categoriaSelecionada = filtro.dataset.categoria;
        filtros.forEach(function(botao) {
            botao.classList.remove("ativo");
        });
        filtro.classList.add("ativo");
        filtrarJogos();
    });
});
carregarJogos();