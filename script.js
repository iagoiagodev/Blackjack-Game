let body = document.querySelector('body');
let gameInfo = document.querySelector('.game-info');
let messageEl = document.querySelector('#message-el');
let cardsEl = gameInfo.querySelector('#cards');
let sumEl = gameInfo.querySelector('#sum');
let playerEl = gameInfo.querySelector('#player-el');

let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = ``;
let player = {
  name: 'Player',
  chips: 150,
};

playerEl.textContent = `${player.name}: $${player.chips}`;

function blackjackRules() {
  if (sum <= 20) {
    message = `Hit or stand? The choice is yours! 🎲`;
    isAlive = true;
  } else if (sum === 21) {
    hasBlackjack = true;
    message = `Blackjack! You're on fire! 🔥`;
  } else {
    isAlive = false;
    message = `Busted! Better luck next time! 💔`;
  }
}

function getRandomCard() {
  const randomCard = Math.floor(Math.random() * (13 - 1 + 1) + 1);
  if (randomCard === 1) {
    return 11;
  } else if (randomCard > 10) {
    return 10;
  } else {
    return randomCard;
  }
}

function fixAces() {
  if (sum > 21 && cards.includes(11)) {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i] === 11) {
        cards[i] = 1;
        sum -= 10;
        break;
      }
    }
  }
}

function startHand() {
  cards = [];
  sum = 0;
  hasBlackjack = false;
  cardsEl.textContent = `Cards: `;

  for (let i = 0; i < 2; i++) {
    const cardsHand = getRandomCard();
    cards.push(cardsHand);
    sum += cardsHand;
    if (i > 0) {
      cardsEl.textContent += `, `;
    }
    cardsEl.textContent += cards[i];
  }

  blackjackRules();
  messageEl.textContent = message;
  sumEl.textContent = `Sum: ${sum}`;
}

function drawNewCard() {
  if (!allowDrawCard())
    return (messageEl.textContent = `You can't draw more cards. 💀`);
  const newCard = getRandomCard();
  cards.push(newCard);
  sum += newCard;
  fixAces();
  blackjackRules();
  messageEl.textContent = message;
  cardsEl.textContent = `Cards: ` + cards.join(`, `);
  sumEl.textContent = `Sum: ${sum}`;
}

function allowDrawCard() {
  return isAlive && !hasBlackjack;
}
