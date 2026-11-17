const formulario = document.getElementById("formAnimal");
const listaAnimais = document.getElementById("listaAnimais");
let animais = [];

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const dados = new FormData(formulario);
  const arquivoFoto = dados.get("foto");

  const animal = {
    id: Date.now(),
    nome: dados.get("nome").trim(),
    especie: dados.get("especie"),
    idade: dados.get("idade").trim(),
    caracteristicas: dados.get("caracteristicas").trim(),
    foto: arquivoFoto && arquivoFoto.size > 0 ? URL.createObjectURL(arquivoFoto) : "",
    adotado: false
  };

  animais.push(animal);
  formulario.reset();
  mostrarAnimais();
});

function mostrarAnimais() {
  listaAnimais.innerHTML = "";
  const disponiveis = animais.filter(animal => !animal.adotado);

  if (disponiveis.length === 0) {
    listaAnimais.innerHTML = '<p class="vazio">Nenhum animal disponível no momento.</p>';
    return;
  }

  disponiveis.forEach(function (animal) {
    const card = document.createElement("article");
    card.className = "animal";

    const titulo = document.createElement("h3");
    titulo.textContent = animal.nome;
    const especie = document.createElement("p");
    especie.textContent = "Espécie: " + animal.especie;
    const idade = document.createElement("p");
    idade.textContent = "Idade: " + animal.idade;
    const caracteristicas = document.createElement("p");
    caracteristicas.textContent = animal.caracteristicas;
    card.append(titulo, especie, idade, caracteristicas);

    if (animal.foto) {
      const imagem = document.createElement("img");
      imagem.src = animal.foto;
      imagem.alt = "Fotografia de " + animal.nome;
      card.prepend(imagem);
    }

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Marcar como adotado";
    botao.addEventListener("click", function () {
      animal.adotado = true;
      mostrarAnimais();
    });
    card.appendChild(botao);
    listaAnimais.appendChild(card);
  });
}
