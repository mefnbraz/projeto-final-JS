
const bandeiras = [
    { nome: "Alemanha", imagem: "Alemanha.png" },
    { nome: "Argentina", imagem: "Argentina.jpg" },
    { nome: "Brasil", imagem: "brasil.jpg" },
    { nome: "Espanha", imagem: "Espanha.jpg" },
    { nome: "Estados Unidos", imagem: "EUA.jpg" },
    { nome: "França", imagem: "Fraça.png" },
    { nome: "Itália", imagem: "italia.png" },
    { nome: "Japão", imagem: "Japao.jpg" },
    { nome: "Portugal", imagem: "Portugal.png" },
    { nome: "Reino Unido", imagem: "Reino Unido.png" }
];

// Elementos do HTML
const inicio = document.getElementById("inicio");
const partida = document.getElementById("partida");
const fim = document.getElementById("fim");

const imagemBandeira = document.getElementById("bandeira");
const campoResposta = document.getElementById("resposta");
const mensagem = document.getElementById("mensagem");

const progresso = document.getElementById("progresso");
const pontuacao = document.getElementById("pontuacao");

const botaoComecar = document.getElementById("comecar");
const botaoProxima = document.getElementById("proxima");
const botaoReiniciar = document.getElementById("reiniciar");
const formulario = document.getElementById("form-resposta");

let bandeirasSorteadas = [];
let indiceAtual = 0;
let pontos = 0;

// Remove acentos e ignora letras maiúsculas
function normalizar(texto) {
    return texto
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ");
}

// Embaralha as bandeiras
function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// Iniciar o jogo
function iniciarJogo() {
    bandeirasSorteadas = embaralhar(bandeiras);

    indiceAtual = 0;
    pontos = 0;

    inicio.classList.add("escondido");
    fim.classList.add("escondido");
    partida.classList.remove("escondido");

    mostrarBandeira();
}

// Mostrar a bandeira atual
function mostrarBandeira() {
    const atual = bandeirasSorteadas[indiceAtual];

    imagemBandeira.src =
        "1bandeiras faceis/" + atual.imagem;

    imagemBandeira.alt = "Bandeira misteriosa";

    progresso.textContent =
        `Bandeira ${indiceAtual + 1} de ${bandeirasSorteadas.length}`;

    pontuacao.textContent = `Pontos: ${pontos}`;

    campoResposta.value = "";
    campoResposta.disabled = false;

    mensagem.textContent = "";
    mensagem.className = "";

    botaoProxima.classList.add("escondido");
    formulario.classList.remove("escondido");

    campoResposta.focus();
}

// Verificar resposta
function verificarResposta(evento) {
    evento.preventDefault();

    const respostaUsuario = normalizar(campoResposta.value);
    const respostaCorreta = normalizar(
        bandeirasSorteadas[indiceAtual].nome
    );

    if (respostaUsuario === respostaCorreta) {
        pontos++;

        mensagem.textContent = "Parabéns! Você acertou!";
        mensagem.className = "correto";
    } else {
        mensagem.textContent =
            "Você errou! A resposta era: " +
            bandeirasSorteadas[indiceAtual].nome;

        mensagem.className = "errado";
    }

    pontuacao.textContent = `Pontos: ${pontos}`;

    campoResposta.disabled = true;
    formulario.classList.add("escondido");
    botaoProxima.classList.remove("escondido");
}

// Próxima bandeira
function proximaBandeira() {
    indiceAtual++;

    if (indiceAtual < bandeirasSorteadas.length) {
        mostrarBandeira();
    } else {
        finalizarJogo();
    }
}

// Finalizar o jogo
function finalizarJogo() {
    partida.classList.add("escondido");
    fim.classList.remove("escondido");

    const total = bandeirasSorteadas.length;

    document.getElementById("resultado-final").textContent =
        `Você acertou ${pontos} de ${total} bandeiras!`;
}

// Eventos dos botões
botaoComecar.addEventListener("click", iniciarJogo);

formulario.addEventListener("submit", verificarResposta);

botaoProxima.addEventListener("click", proximaBandeira);

botaoReiniciar.addEventListener("click", iniciarJogo);
