"use strict";

const cardsEl = document.querySelector('#cards-el');
const startBtn = document.querySelector('#start-btn');
const saveBtn = document.querySelector('#save-btn');
const messageEl = document.querySelector('#message-el');
const playerEl = document.querySelector('#player-el');
const gameResultEl = document.querySelector('#game-result-el');

let sum;
let roundNumber = 1;
let totalScore = 0;
let player1Turn = true;
let player2Turn = false;
let player1Score;
let player2Score;
let gameNumber = 1;
let player1Wins = 0;
let player2Wins = 0;
let gameOver = false;


startBtn.addEventListener('click', startNewGame);
saveBtn.addEventListener('click', renderResults);
document.querySelector('#new-card-btn').addEventListener('click', getNewCard);

function startNewGame() {
   let firstCard = getRandom();
   let secondCard = getRandom();

   cardsEl.innerHTML = `Cards: ${firstCard}, ${secondCard}`;
   sum = firstCard + secondCard;
   renderSum();
   showMessage();
   toggleBtns(startBtn, saveBtn);
   if (roundNumber === 1) {
      playerEl.innerHTML = "Points:";
   }
   if (gameOver) {
      deleteResults();
      gameResultEl.innerHTML = `Game # 1`;
   }
}

function getNewCard() {
   if (sum < 21) {
      let newCard = getRandom();
      cardsEl.innerHTML += `, ${newCard}`;
      sum += newCard;
      renderSum();
      showMessage();   
   }
}

function getRandom() {
   let randomCard = Math.floor(Math.random() * 13 + 1);
   if (randomCard > 10) {
      randomCard = 10;
   } else if (randomCard === 1) {
      randomCard = 11;
   }
   return randomCard;
}

function renderSum() {
   const sumEl = document.querySelector('#sum-el');
   sumEl.innerHTML = `Sum: ${sum}`; 
}

function showMessage() {
   if (sum < 21) {
      messageEl.innerHTML = "Feel like a new card?"
   } else if (sum > 21) {
      messageEl.innerHTML = "You're out of the game"
   } else {
      messageEl.innerHTML = "You've got Blackjack!"
   }
}

function renderResults() {
   toggleBtns(saveBtn, startBtn);
   playerEl.innerHTML += ` ${getResults()}`;
   showRoundNumber();
}

function getResults() {
   let playerResult = 0;
   if (sum === 21) {
      playerResult = 31;
      totalScore += 31;
   } else if (sum > 21) {
      playerResult = 0;
      totalScore += 0;
   } else {
      playerResult = sum;
      totalScore += sum;
   }
   return playerResult;
}

function toggleBtns(none, block) {
   none.style.display = "none";
   block.style.display = "block";
}

function showRoundNumber() {
   roundNumber++;
   messageEl.innerHTML = `Player, start round ${roundNumber}`;
   trackRoundResults();
}

function trackRoundResults() {
   if (roundNumber > 3 && player1Turn) {
      player1Score = totalScore;
      unsetRound('Player 2', 'Player 1');
      player2Turn = true;
      player1Turn = false;
   } else if (roundNumber > 3 && player2Turn) {
      player2Score = totalScore;
      unsetRound('Player 1', 'Player 2');
      player1Turn = true;
      player2Turn = false;
      chooseWinner(player1Score, player2Score);
   }
}

function unsetRound(newPlayer, oldPlayer) { 
   messageEl.innerHTML = `${newPlayer}, start a new game`;
   playerEl.innerHTML = `${oldPlayer} total score is ${totalScore}`;
   totalScore = 0;
   roundNumber = 1;
}

function chooseWinner(player1, player2) {
   if (player1 > player2) {
      playerEl.innerHTML = `Player 1 wins ${player1} - ${player2}`;
      player1Wins++;
      gameNumber++
   } else {
      playerEl.innerHTML = `Player 2 wins ${player1} - ${player2}`;
      player2Wins++;
      gameNumber++;
   }
   trackGameNumber();
}

function trackGameNumber() {
   if (gameNumber === 2) {
      gameResultEl.innerHTML = `Game # 2`;
   } else if (gameNumber === 3 && player1Wins === 2) {
      gameResultEl.innerHTML = `Player 1 wins. Congrats!`;
      gameOver = true;
   } else if (gameNumber === 3 && player2Wins === 2) {
      gameResultEl.innerHTML = `Player 2 wins. Congrats!`;
      gameOver = true;
   } else if (gameNumber === 4 && player1Wins === 2) {
      gameResultEl.innerHTML = `Player 1 wins. Congrats!`;
      gameOver = true;
   } else if (gameNumber === 4 && player2Wins === 2) {
      gameResultEl.innerHTML = `Player 2 wins. Congrats!`;
      gameOver = true;
   } else if (gameNumber === 3 && player2Wins === 1) {
      gameResultEl.innerHTML = `Game # 3`;
   }
}

function deleteResults() {
   gameNumber = 1;
   player1Wins = 0;
   player2Wins = 0;
   gameOver = false;
}



