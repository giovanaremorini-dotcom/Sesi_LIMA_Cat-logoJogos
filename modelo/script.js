
const pesquisa = document.getElementById("pesquisa");
const jogos = document.querySelectorAll(".card");
const filtros = document.querySelectorAll(".filtro");
const mensagem = document.getElementById("mensagem");

let categoriaSelecionada = "Todos";

// Filtrar os jogos
function filtrarJogos() {

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

    // Exibir mensagem quando não houver resultados
    if (quantidade === 0) {
        mensagem.textContent = "Nenhum jogo encontrado.";
    } else {
        mensagem.textContent = "";
    }

}

// Pesquisar jogos pelo nome
pesquisa.addEventListener("input", filtrarJogos);

// Filtrar por categoria
filtros.forEach(function(filtro) {

    filtro.addEventListener("click", function() {

        categoriaSelecionada = filtro.dataset.categoria;

        // Atualizar botão selecionado
        filtros.forEach(function(botao) {
            botao.classList.remove("ativo");
        });

        filtro.classList.add("ativo");

        filtrarJogos();

    });

});
