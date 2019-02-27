'use strict';

var newGame = document.getElementById('new-game');
var output = document.getElementById('output');
var results = document.getElementById('results');
var rounds = document.getElementById('rounds');
var score = document.getElementById('score');


//---------------------ETAP 3 ZADANIA - przypisanie parametrów do obiektu

var params = {
  scorePlayer: '',
  scoreComputer: '',
  roundsToWin: '',
  progress: [],

  roundsPlayed: 0,
  endGame: ''
}

//---------------------------------ETAP 4 ZADANIA - modal


function openModal() {
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.classList.remove('show');//czyszczenie show z modali
  })
  document.getElementById('modal-one').classList.add('show');//uzupelnienie o show w wybranym modalu
};

var showModal = function(){
  document.getElementById('modal-overlay').classList.add('show');
  openModal();
};

var hideModal = function(){
  document.querySelector('#modal-overlay').classList.remove('show');
};


window.onload=function(){

  document.querySelector('#modal-overlay').addEventListener('click', hideModal);

  var closeButtons = document.querySelectorAll('.modal .close');

  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }

  var modals = document.querySelectorAll('.modal');
    
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }
}

//-----------------------------------ETAP 5 - tworzenie tablic z wynikiem

function createTable(){
  var body = document.getElementsByTagName('span')[0];
  // var body = document.getElementById('table')[0];
  var tab = document.createElement('table');
  
  var table = document.getElementsByTagName('table')[0];

  for (var row=0; row<params.progress.length; row++){
    var tr = document.createElement('tr');
    for (var col=0; col<params.progress[row].length; col++) {
      var td = document.createElement('td');
      var tn = document.createTextNode(params.progress[row][col]);
      td.appendChild(tn);
      tr.appendChild(td);
    };
    tab.appendChild(tr);
  };

  table.parentNode.removeChild(table);//czyszczenie pierwszego wpisu w tablicy

  body.appendChild(tab);
};

//--------------------------------WŁASCIWY KOD GRY

var startNewGame = function(){ //rozpoczynanie nowej gry
  params.scoreComputer = 0; //zerowanie punktow komputera
  params.scorePlayer = 0; //zerowanie punktow gracza
  params.roundsPlayed = 0; //zerowanie ilosci rund
  results.innerHTML = ""; //czyszczenie results
  output.innerHTML = ""; //czyszczenie output
  params.progress.length = 0; //czyszczenie tablicy z wynikiem
  params.endGame = 0;
  params.roundsToWin = window.prompt('HOW MANY ROUNDS TO WIN?');
  
  if (isNaN(params.roundsToWin) || params.roundsToWin == null || params.roundsToWin == ' ' || params.roundsToWin == '') {
    return rounds.innerHTML = 'PLEASE ENTER A NUMBER OF ROUNDS!';
  } else {
    rounds.innerHTML = 'ROUNDS: ' + params.roundsToWin;
  }
  return params.roundsToWin; //zwracanie ilosci rund od ktorych bedzie zalezec dalsza gra
}

var counter = function(num) { //dodawanie punktow
  var score = document.getElementById('score');

  
  if (num == 1 && params.scorePlayer < params.roundsToWin && params.scoreComputer < params.roundsToWin) { //gracz wygral punkt
    params.roundsPlayed += 1;
    params.scorePlayer += 1;
  } else if (num == 0 && params.scoreComputer < params.roundsToWin && params.scorePlayer < params.roundsToWin) { //gracz przegral punkt
    params.scoreComputer += 1;
    params.roundsPlayed += 1;
  } else {
    results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer; //remis
    params.roundsPlayed += 1;
  }
  
  results.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer;
  
  if (params.scorePlayer >= params.roundsToWin && params.scorePlayer != '' && params.endGame < 1) {
    showModal();
    score.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer + '<br><b>YOU WON!</b>';
    params.endGame++;
  } else if (params.scoreComputer >= params.roundsToWin && params.scorePlayer != '' && params.endGame < 1){
    showModal();
    score.innerHTML = params.scorePlayer + ' - ' + params.scoreComputer + '<br><b>YOU LOST!</b>';
    params.endGame++;
  }
}

var compMove = function() { //losowanie ruchow przeciwnika
  
  var options = ['paper', 'rock', 'scissors'];
  var move = options[Math.floor(Math.random()*options.length)];
  return move;
}

var playerMove = function(num) { //ruch gracza
  
  var optionPlayer = num; 
  var optionComp = compMove();
  
  if (params.roundsToWin == '') { //wymaganie od gracza ilosci rund
    output.innerHTML = 'YOU NEED A NUMBER THERE!';
    results.innerHTML = '';
    return;
  } else if (params.roundsToWin != '' && params.scorePlayer >= params.roundsToWin || params.scoreComputer >= params.roundsToWin) {
    output.innerHTML = "GAME IS OVER! PLEASE PRESS NEW GAME BUTTON";
    return;
  };
  
  if (optionPlayer == 'paper' && optionComp == 'rock') { //porownywanie wyborow gracza i komputera
    output.innerHTML = 'You WIN: You played ' + optionPlayer.toUpperCase() + ' and opponent played ' + optionComp.toUpperCase();
    counter(1);
  } else if (optionPlayer == 'scissors' && optionComp == 'paper') {
    output.innerHTML = 'You WIN: You played ' + optionPlayer.toUpperCase() + ' and opponent played ' + optionComp.toUpperCase();
    counter(1);
  } else if (optionPlayer == 'rock' && optionComp == 'scissors') {
    output.innerHTML = 'You WIN: You played ' + optionPlayer.toUpperCase() + ' and opponent played ' + optionComp.toUpperCase();
    counter(1);
  } else if (optionPlayer === optionComp) {
    output.innerHTML = 'It\'s a DRAW!';
    counter(2);
  } else {
    output.innerHTML = 'You LOST: You played ' + optionPlayer.toUpperCase() + ' and opponent played ' + optionComp.toUpperCase();
    counter(0);
  };

  if (params.roundsToWin != '') {
    params.progress.push(['runda', params.roundsPlayed, 'twój wynik', params.scorePlayer, 'wynik przeciwnika', params.scoreComputer, 'twój ruch', optionPlayer, 'ruch przeciwnika', optionComp]);
    createTable(params.progress);
  };
};

newGame.addEventListener('click', startNewGame);

//---------------------------------ETAP 2 ZADANIA - pętla dla wyborów gracza

document.querySelectorAll('.player-move').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    playerMove(btn.dataset.move);
  });
});