'use strict';

var newGame = document.getElementById('new-game');
var stone = document.getElementById('stone');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var output = document.getElementById('output');
var results = document.getElementById('results');
var roundsAmount = document.getElementById('rounds');

var scorePlayer = 0;
var pointsPlayer = scorePlayer;
var scoreComp = 0;
var pointsComp = scoreComp;
var round;

var startNewGame = function(){ //rozpoczynanie nowej gry
  pointsComp = 0; //zerowanie punktow komputera
  pointsPlayer = 0; //zerowanie punktow gracza
  results.innerHTML = ""; //czyszczenie results
  output.innerHTML = ""; //czyszczenie output
  round = window.prompt('HOW MANY ROUNDS TO WIN?');
  
  if (isNaN(round) || round == null || round == ' ' || round == '') {
    return roundsAmount.innerHTML = 'PLEASE ENTER A NUMBER OF ROUNDS!';
  } else {
    roundsAmount.innerHTML = 'ROUNDS: ' + round;
  }
  return round; //zwracanie ilosci rund od ktorych bedzie zalezec dalsza gra
}

var counter = function(num) { //dodawanie punktow
  
  if (num == 1 && pointsPlayer < round && pointsComp < round) { //gracz wygral punkt
    pointsPlayer += 1;
  } else if (num == 0 && pointsComp < round && pointsPlayer < round) { //gracz przegral punkt
    pointsComp += 1;
  } else {
    results.innerHTML = pointsPlayer + ' - ' + pointsComp; //remis
  }
  
  results.innerHTML = pointsPlayer + ' - ' + pointsComp;
  
  if (pointsPlayer >= round) {
    results.innerHTML = pointsPlayer + ' - ' + pointsComp + '<br>YOU WON!';
  } else if (pointsComp >= round){
    results.innerHTML = pointsPlayer + ' - ' + pointsComp + '<br>YOU LOST!';
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
  
  if (round == undefined) { //wymaganie od gracza ilosci rund
    output.innerHTML = 'YOU NEED A NUMBER THERE!';
    results.innerHTML = '';
  }
  
  if (pointsPlayer >= round || pointsComp >= round) {
    output.innerHTML = "GAME IS OVER! PLEASE PRESS NEW GAME BUTTON";
  }
};

newGame.addEventListener('click', startNewGame);
stone.addEventListener('click', function(){playerMove(1)});
paper.addEventListener('click', function(){playerMove(2)});
scissors.addEventListener('click', function(){playerMove(3)});