
const jogos = document.querySelectorAll(".card");
const filtros = document.querySelectorAll(".filtro");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

let categoriaSelecionada = "Todos";
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

    if (quantidade === 0) {
        mensagem.textContent = "Nenhum jogo encontrado.";
    } else {
        mensagem.textContent = "";
    }
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