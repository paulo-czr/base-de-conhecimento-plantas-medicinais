let cardContainer = document.querySelector(".card-container");
let dados = [];
let inputBusca = document.querySelector("input");

/**
 * Função principal de busca
 * - Carrega o JSON
 * - Filtra resultados pelo termo digitado
 * - Renderiza os cards de acordo com a busca
 */
async function iniciarBusca() {
  console.log("Função iniciarBusca chamada");

  try {
    console.log("Fazendo fetch do JSON...");
    let resposta = await fetch("data.json");

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    dados = await resposta.json();
    console.log("Dados carregados com sucesso:", dados.length, "itens");
    console.log("Primeiro item:", dados[0]);

    let termoBusca = inputBusca.value.toLowerCase().trim();
    console.log("Termo de busca:", termoBusca);

    if (termoBusca === "") {
      console.log("Busca vazia - mostrando todos os itens");
      renderizarCards(dados);
      return;
    }

    console.log("Filtrando dados...");
    let resultados = dados.filter((dado) => {
      const matchNome = dado.nome.toLowerCase().includes(termoBusca);
      const matchTags =
        dado.tags &&
        dado.tags.some((tag) => tag.toLowerCase().includes(termoBusca));

      console.log(
        `Planta: ${dado.nome}, matchNome: ${matchNome}, matchTags: ${matchTags}`
      );

      return matchNome || matchTags;
    });

    console.log("Resultados encontrados:", resultados.length);
    renderizarCards(resultados);
  } catch (error) {
    console.error("Erro na busca:", error);
    cardContainer.innerHTML = `<p style="color: red;">Erro ao carregar dados: ${error.message}</p>`;
  }
}

/**
 * Renderiza os cards de plantas na tela
 * @param {Array} dados - Recebe a lista de plantas (todas ou filtradas)
 */
function renderizarCards(dados) {
  console.log("Renderizando cards:", dados.length);

  cardContainer.innerHTML = "";

  if (dados.length === 0) {
    cardContainer.innerHTML =
      "<p>Nenhuma planta encontrada. Tente 'boldo', 'camomila' ou 'hortelã'.</p>";
    return;
  }

  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <h2>${dado.nome}</h2>
        <h3><em>${dado.nome_cientifico}</em></h3>

        <section>
            <h4>Parte utilizada</h4>
            <p>${dado.parte_utilizada}</p>
        </section>

        <section>
            <h4>Benefícios</h4>
            <p>${dado.beneficios}</p>
        </section>

        <section>
            <h4>Modo de uso</h4>
            <p>${dado.modo_de_uso}</p>
        </section>

        <section>
            <h4>Dosagem</h4>
            <p>${dado.dosagem}</p>
        </section>

        <section class ="contraindicacoes">
            <h4>Contraindicações</h4>
            <p>${dado.contraindicacoes}</p>
        </section>

        <section class ="efeitos_colaterais">
            <h4>Efeitos colaterais</h4>
            <p>${dado.efeitos_colaterais}</p>
        </section>

        <section class ="curiosidade">
            <h4>Curiosidade</h4>
            <p>${dado.curiosidade}</p>
        </section>

        <a href="${dado.link}" target="_blank">Saiba mais</a>
    `;
    cardContainer.appendChild(article);
  }

  console.log("Cards renderizados com sucesso");
}

/**
 * Detecta quando o usuário pressiona ENTER no campo de busca
 * e executa a função iniciarBusca()
 */
inputBusca.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log("Enter pressionado");
    iniciarBusca();
  }
});

/**
 * Executa a busca inicial assim que o DOM terminar de carregar
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado - iniciando busca inicial");
  iniciarBusca();
});

