
const bandeiras = [
    { nome: "África do Sul", imagem: "Africa do sul.jpg" },
    { nome: "Canadá", imagem: "Canadá.png" },
    { nome: "China", imagem: "China.png" },
    { nome: "Coreia do Sul", imagem: "Coreia do sul.png" },
    { nome: "Grécia", imagem: "Grécia.jpg" },
    { nome: "México", imagem: "México.png" },
    { nome: "Noruega", imagem: "Noruega.jpg" },
    { nome: "Suécia", imagem: "Suécia.png" },
    { nome: "Suíça", imagem: "Suiça.jpg" },
    { nome: "Turquia", imagem: "Túrquia.png" },
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

// Normalizar respostas

function normalizar(texto) {
    return texto
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ");
}

// Embaralhar as bandeiras

function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// Iniciar partida

function iniciarJogo() {
    bandeirasSorteadas = embaralhar(bandeiras);

    indiceAtual = 0;
    pontos = 0;

    inicio.classList.add("escondido");
    fim.classList.add("escondido");
    partida.classList.remove("escondido");

    mostrarBandeira();
}

// Mostrar a bandeira

function mostrarBandeira() {
    const atual = bandeirasSorteadas[indiceAtual];

    imagemBandeira.src =
        "2bandeiras medias/" + atual.imagem;

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

// Finalizar partida

function finalizarJogo() {
    partida.classList.add("escondido");
    fim.classList.remove("escondido");

    const total = bandeirasSorteadas.length;

    document.getElementById("resultado-final").textContent =
        `Você acertou ${pontos} de ${total} bandeiras!`;

    const avaliacao = document.getElementById("avaliacao");

    if (pontos === total) {
        avaliacao.textContent = "Excelente! Você é um mestre das bandeiras!";
    } else if (pontos >= 7) {
        avaliacao.textContent = "Muito bem! Você conhece bastante!";
    } else if (pontos >= 4) {
        avaliacao.textContent = "Bom trabalho! Continue praticando!";
    } else {
        avaliacao.textContent = "Não desista! Tente novamente!";
    }
}

// Eventos

botaoComecar.addEventListener("click", iniciarJogo);

formulario.addEventListener("submit", verificarResposta);

botaoProxima.addEventListener("click", proximaBandeira);

botaoReiniciar.addEventListener("click", iniciarJogo);
