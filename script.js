"use strict"

//let userName = prompt("Enter your name", '');



let firstCard;
let secondCard;
let sum;
let cards = [];
let messageEl = document.querySelector('#message-el');
let cardsEl = document.querySelector('#cards-el');
let sumEl = document.querySelector('#sum-el');
let isAlive = false;
let hasBlackJack = false;

function getRandom() {
   let randomCard = Math.floor(Math.random() * 13) + 1
   if (randomCard === 1) {
      return 11
   } else if (randomCard > 10) {
      return 10
   } else return randomCard
}

function startGame() {
   firstCard = getRandom();
   secondCard = getRandom();
   cards = [firstCard, secondCard];
   sum = firstCard + secondCard;
   renderGame()
}

function renderGame() {
   if (sum < 21) {
      messageEl.textContent = "Want to draw a new card?"
      isAlive = true
   } else if (sum === 21) {
      messageEl.textContent = "You've got Blackjack!"
      hasBlackJack = true
   } else {
      messageEl.textContent = "You're out of the game"
      isAlive = false
   }
   cardsEl.textContent = "Cards: "
   sumEl.textContent = "Sum: " + sum;
   for (let i = 0; i < cards.length; i++) {
      cardsEl.textContent += cards[i] + " "
   }
}

function getNewCard() {
   if (isAlive && !hasBlackJack) {
   let newCard = getRandom();
   cards.push(newCard);
   sum += newCard; 
   renderGame()
   }
}




