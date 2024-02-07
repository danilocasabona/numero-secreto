let listaDeNumerosSorteados = [];
let numerosLimite = 100;
let numeroAleatorio = gerarNumeroAleatorio();

function alterarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}
function exibirMensagemInicial(){
    alterarTextoNaTela('h1', 'Jogo do número secreto!');
    alterarTextoNaTela('p', 'Escolha um número entre 1 e 100:');
}

exibirMensagemInicial();
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value;
    // console.log(numeroAleatorio);
    // console.log(chute == numeroAleatorio);
    if (chute == numeroAleatorio) {
        alterarTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você precisou de ${tentativas} ${palavraTentativa}!`;
        alterarTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', 'disabled');
    } else {
        if (chute > numeroAleatorio) {
            alterarTextoNaTela('h1', 'Errou!');
            alterarTextoNaTela('p', 'O número secreto é menor!');
        } else {
            alterarTextoNaTela('h1', 'Errou!');
            alterarTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numerosLimite) + 1;
    let qtdElementosLista = listaDeNumerosSorteados.length;
    if (qtdElementosLista == numerosLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    document.querySelector('input').value = ''
}

function reiniciarJogo(){
    tentativas = 1;
    numeroAleatorio = gerarNumeroAleatorio();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    document.getElementById('chutar').removeAttribute('disabled');
    limparCampo();
    document.querySelector('input').focus();
}