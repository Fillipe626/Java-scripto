var timerId = null; //variavel que armazena a chamada da função timeout

function iniciaJogo(){

	var url = window.location.search; //recupera a querystring da url com o nivel do nivel_jogo
	var nivel_jogo = url.replace("?",""); //Elimina o sinal de interrogação da url para recuperar somente o nível


var tempo_segundos = 0;

if (nivel_jogo == 1){//1 facil -> 120 segundos
	tempo_segundos = 120;
}

if (nivel_jogo == 2){//2 normal -> 60 segundos
	tempo_segundos = 60;

}

if (nivel_jogo == 3){//3 dificil -> 30 segundos
	tempo_segundos = 30;

}

//inserindo segundos no span

document.getElementById('cronometro').innerHTML = tempo_segundos; //insere o tempo do lado do cronometro

// quantidade de balao
var qtde_baloes = 80;

cria_baloes(qtde_baloes);

//imprimir qtde baloes baloes_inteiros
document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_segundos + 1) //Senão tempo começa a menor
}

function contagem_tempo(segundos) {

	segundos = segundos -1;

	if (segundos == -1){
		clearTimeout(timerId); // para a execução da função do setTimeout ao chegar a zero
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

timerId =	setTimeout("contagem_tempo("+segundos+")", 1000); //executa a função a cada milisegundo

}

function game_over(){
	alert('Fim de jogo, não estourou os baloes a tempo');
};

function cria_baloes(qtde_baloes) {

	for (var i =1; i<= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i; // atribui um numero aos baloes com base na variavel contadora
		balao.onclick = function(){
			estourar(this);
		}

		document.getElementById('cenario').appendChild(balao); //adiciona um elemeto filho a div cenário, caso controrio os baloes ficariam sobrepostos
	}

}

function estourar(e){

	var id_balao = e.id;
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);

}

function pontuacao(acao){
	var baloes_inteiros  = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);

}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 00){
		alert('Parabens, voce conseguiu estourar todos os baloes a tempo');
		parar_jogo();
	}
	function parar_jogo(){
		clearTimeout(timerId);
	}
}
