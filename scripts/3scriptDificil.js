const bandeiras = [
    { nome: "Butão", imagem: "Butão.png" },
    { nome: "Cazaquistão", imagem: "Cazaquistão.jpg" },
    { nome: "Comores", imagem: "Comores.png" },
    { nome: "Essuatíni", imagem: "Essuatíni.jpg" },
    { nome: "Kiribati", imagem: "Kiribati.avif" },
    { nome: "Lesoto", imagem: "Lesoto.jpg" },
    { nome: "Moldávia", imagem: "Moldávia.jpg" },
    { nome: "Quirguistão", imagem: "Quirguistão.png" },
    { nome: "Seychelles", imagem: "Seychelles.jpg" },
    { nome: "Vanuatu", imagem: "Vanuatu.png" }
];

// Elementos do HTML

const inicio = document.getElementById("inicio");
const partida = document.getElementById("partida");
const fim = document.getElementById("fim");

const imagemBandeira = document.getElementById("bandeira");
const mensagem = document.getElementById("mensagem");

const progresso = document.getElementById("progresso");
const pontuacao = document.getElementById("pontuacao");
const alternativas = document.getElementById("alternativas");

const botaoComecar = document.getElementById("comecar");
const botaoProxima = document.getElementById("proxima");
const botaoReiniciar = document.getElementById("reiniciar");

let bandeirasSorteadas = [];
let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

// Embaralhar uma lista

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
    respondeu = false;

    inicio.classList.add("escondido");
    fim.classList.add("escondido");
    partida.classList.remove("escondido");

    mostrarBandeira();
}

// Mostrar a bandeira atual

function mostrarBandeira() {
    const atual = bandeirasSorteadas[indiceAtual];

    respondeu = false;

    imagemBandeira.src =
        "3bandeiras dificeis/" + atual.imagem;

    imagemBandeira.alt = "Bandeira misteriosa";

    progresso.textContent =
        `Bandeira ${indiceAtual + 1} de ${bandeirasSorteadas.length}`;

    pontuacao.textContent = `Pontos: ${pontos}`;

    mensagem.textContent = "";
    mensagem.className = "";

    botaoProxima.classList.add("escondido");

    criarAlternativas(atual);
}

// Criar quatro alternativas aleatórias

function criarAlternativas(atual) {
    alternativas.innerHTML = "";

    // Três países incorretos
    const erradas = embaralhar(
        bandeiras.filter(pais => pais.nome !== atual.nome)
    ).slice(0, 3);

    // Uma correta e três incorretas
    const opcoes = embaralhar([atual, ...erradas]);

    opcoes.forEach(opcao => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = opcao.nome;

        botao.addEventListener("click", () => {
            verificarResposta(opcao.nome);
        });

        alternativas.appendChild(botao);
    });
}

// Verificar a resposta

function verificarResposta(resposta) {
    if (respondeu) return;

    respondeu = true;

    const correta = bandeirasSorteadas[indiceAtual].nome;

    if (resposta === correta) {
        pontos++;

        mensagem.textContent = "Parabéns! Você acertou!";
        mensagem.className = "correto";
    } else {
        mensagem.textContent =
            "Você errou! A resposta era: " + correta;

        mensagem.className = "errado";
    }

    pontuacao.textContent = `Pontos: ${pontos}`;

    // Destacar a resposta correta e a incorreta
    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;

        if (botao.textContent === correta) {
            botao.classList.add("correta");
        } else if (botao.textContent === resposta) {
            botao.classList.add("incorreta");
        }
    });

    botaoProxima.classList.remove("escondido");
}

// Avançar para a próxima bandeira

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
        avaliacao.textContent = "Incrível! Você dominou o modo difícil!";
    } else if (pontos >= 7) {
        avaliacao.textContent = "Excelente desempenho!";
    } else if (pontos >= 4) {
        avaliacao.textContent = "Bom trabalho! Continue praticando!";
    } else {
        avaliacao.textContent = "Continue tentando! Você vai melhorar!";
    }
}

// Eventos

botaoComecar.addEventListener("click", iniciarJogo);

botaoProxima.addEventListener("click", proximaBandeira);

botaoReiniciar.addEventListener("click", iniciarJogo);
