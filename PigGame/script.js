'use strict';

// VARIABLES

let playerOne = document.querySelector('.player--0');
let playerTwo = document.querySelector('.player--1');

let playerOneScore = document.querySelector('#score--0');
let playerTwoScore = document.querySelector('#score--1');
let playersCurrentScore = document.querySelectorAll('.current-score');

let dicePic = document.querySelector('.dice');

let rollDiceButton = document.querySelector('.btn--roll');
let holdScoreButton = document.querySelector('.btn--hold');

let score = 0;
let total;

// NOTE: Function that plays the new game

function newGame() {
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playersCurrentScore.forEach(player => (player.textContent = 0));
  score = 0;
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');

  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');

  rollDiceButton.disabled = false;
  holdScoreButton.disabled = false;

  dicePic.style.display = 'none';
}
newGame();

let newGameButton = document.querySelector('.btn--new');
newGameButton.addEventListener('click', newGame);

// NOTE: Function that adds points to the active player

function addPoints(points) {
  let activePlayer = document.querySelector('.player--active');
  let activePlayerScore = activePlayer.querySelector('.current-score');
  score += points;
  activePlayerScore.textContent = score;
}

// NOTE: Function that switches the players

function switchActivePlayer() {
  let activePlayer = document.querySelector('.player--active');
  let players = document.querySelectorAll('.player');
  let newActivePlayer = [...players].find(player => player != activePlayer);

  activePlayer.classList.remove('player--active');
  newActivePlayer.classList.add('player--active');
}

// NOTE: Function that rolls the dice

function rollDice() {
  dicePic.style.display = 'block';
  let dice = Math.floor(Math.random() * 6) + 1;
  dicePic.src = `dice-${dice}.png`;
  let activePlayer = document.querySelector('.player--active');
  let activePlayerScore = activePlayer.querySelector('.current-score');

  if (dice != 1) {
    addPoints(dice);
  } else {
    score = 0;
    activePlayerScore.textContent = 0;
    switchActivePlayer();
  }
}

rollDiceButton.addEventListener('click', rollDice);

// NOTE: Function that lets the player hold their score

function holdScore() {
  let activePlayer = document.querySelector('.player--active');
  let activePlayerTotal = activePlayer.querySelector('.score');
  let activePlayerScore = activePlayer.querySelector('.current-score');

  total = Number(activePlayerTotal.textContent);

  total += score;
  activePlayerTotal.textContent = total;

  score = 0;
  activePlayerScore.textContent = 0;
  switchActivePlayer();

  if (Number(activePlayerTotal.textContent) >= 10) {
    activePlayer.classList.remove('player--active');
    activePlayer.classList.add('player--winner');
    rollDiceButton.disabled = true;
    holdScoreButton.disabled = true;
  }
}

holdScoreButton.addEventListener('click', holdScore);
