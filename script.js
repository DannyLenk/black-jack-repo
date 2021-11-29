"use strict"

let player = {
   name: prompt('Enter your name', ''),
   chips: prompt('How much $ do you want to place?', '')
}
let playerEl = document.querySelector('#player-el');
playerEl.textContent = player.name + ": $" + player.chips;

let firstCard;
let secondCard;
let sum;
let cards = [];
let isAlive = false;
let hasBlackJack = false;
let messageEl = document.querySelector('#message-el');
let cardsEl = document.querySelector('#cards-el');
let sumEl = document.querySelector('#sum-el');


function getRandom() {
   let randomCard = Math.floor( Math.random() * 13 ) + 1;
   if (randomCard > 10) {
      return 10
   } else if (randomCard === 1) {
      return 11
   } else {
      return randomCard
   }
}

function startGame() {
   firstCard = getRandom();
   secondCard = getRandom();
   cards = [firstCard, secondCard];
   sum = firstCard + secondCard;
   isAlive = true;
   renderGame()
}


function renderGame() {
   if (sum < 21) {
      messageEl.textContent = "Want to draw a new card?"
   } else if (sum === 21) {
      messageEl.textContent = "You've got Blackjack!"
      hasBlackJack = true
   } else {
      messageEl.textContent = "You're out of the game!"
      isAlive = false
   }
   cardsEl.textContent = "Cards: ";
   for (let i = 0; i < cards.length; i++) {
      cardsEl.textContent += cards[i] + " "
   }
   sumEl.textContent = "Sum: " + sum
}

function getNewCard() {
   if (isAlive && !hasBlackJack) {
   let card = getRandom();
   cards.push(card);
   sum += card;
   renderGame();
   }
}