'use strict';

var newGame = document.getElementById('new-game');
var output = document.getElementById('output');
var results = document.getElementById('results');
var rounds = document.getElementById('rounds');


//---------------------ETAP 3 ZADANIA
var params = {
  scorePlayer: '',
  scoreComputer: '',
  roundsToWin: '',
  roundsPlayed: '',
  endGame: ''
}

var startNewGame = function(){ //rozpoczynanie nowej gry
  params.scoreComputer = 0; //zerowanie punktow komputera
  params.scorePlayer = 0; //zerowanie punktow gracza
  results.innerHTML = ""; //czyszczenie results
  output.innerHTML = ""; //czyszczenie output
  params.roundsToWin = window.prompt('HOW MANY ROUNDS TO WIN?');
  
  if (isNaN(params.roundsToWin) || params.roundsToWin == null || params.roundsToWin == ' ' || params.roundsToWin == '') {
    return rounds.innerHTML = 'PLEASE ENTER A NUMBER OF ROUNDS!';
  } else {
    rounds.innerHTML = 'ROUNDS: ' + params.roundsToWin;
  }
  return params.roundsToWin; //zwracanie ilosci rund od ktorych bedzie zalezec dalsza gra
}

var counter = function(num) { //dodawanie punktow
  
  if (num == 1 && params.scorePlayer < params.roundsToWin && params.scoreComputer < params.roundsToWin) { //gracz wygral punkt
    params.scorePlayer += 1;
  } else if (num == 0 && params.scoreComputer < params.roundsToWin && params.scorePlayer < params.roundsToWin) { //gracz przegral punkt
    params.scoreComputer += 1;
  } else {
    results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer; //remis
  }
  
  results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer;
  
  if (params.scorePlayer >= params.roundsToWin) {
    results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer + '<br>YOU WON!';
  } else if (params.scoreComputer >= params.roundsToWin){
    results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer + '<br>YOU LOST!';
  }
}

var compMove = function() { //losowanie ruchow przeciwnika
  
  var compOption;
  compOption = Math.round(Math.random() * 2 + 1);
  return compOption;
}

var playerMove = function(num) { //ruch gracza
  
  var optionPlayer = num; 
  var optionComp = compMove();
  console.log(optionPlayer);
  
  if (optionPlayer == 1 && optionComp == 2) { //porownywanie wyborow gracza i komputera
    output.innerHTML = 'You WIN: You played PAPER and opponent played ROCK';
    counter(1);
  } else if (optionPlayer == 1 && optionComp == 3) {
    output.innerHTML = 'You LOST: You played PAPER and opponent played SCISSORS';
    counter(0);
  } else if (optionPlayer == 3 && optionComp == 1) {
    output.innerHTML = 'You WIN: You played SCISSORS and opponent played PAPER';
    counter(1);
  } else if (optionPlayer == 3 && optionComp == 2) {
    output.innerHTML = 'You LOST: You played SCISSORS and opponent played ROCK';
    counter(0);
  } else if (optionPlayer == 2 && optionComp == 3) {
    output.innerHTML = 'You WIN: You played ROCK and opponent played SCISSORS';
    counter(1);
  } else if (optionPlayer == 2 && optionComp == 1) {
    output.innerHTML = 'You LOST: You played ROCK and opponent played PAPER';
    counter(0);
  } else {
    output.innerHTML = 'It\'s a DRAW!';
    counter(2);
  };
  
  if (params.roundsToWin == undefined) { //wymaganie od gracza ilosci rund
    output.innerHTML = 'YOU NEED A NUMBER THERE!';
    results.innerHTML = '';
  }
  
  if (params.scorePlayer >= params.roundsToWin || params.scoreComputer >= params.roundsToWin) {
    output.innerHTML = "GAME IS OVER! PLEASE PRESS NEW GAME BUTTON";
  }
};

newGame.addEventListener('click', startNewGame);

//---------------------------------ETAP 2 ZADANIA

document.querySelectorAll('.player-move').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    var x = btn.dataset.move; //pobieranie nazwy ruchu gracza

    var y; //zmienna potrzebna by przypisac ruch gracza do numeru

    if (x == 'paper') {
      y = 1;
    } else if (x == 'stone') {
      y = 2;
    } else {
      y = 3;
    }

    playerMove(y);
  });
});