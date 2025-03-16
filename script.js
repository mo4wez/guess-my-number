'use strict';

// Constants for game configuration
const INITIAL_SCORE = 20;
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;
const WIN_BACKGROUND_COLOR = '#60b347';
const INITIAL_BACKGROUND_COLOR = '#222';
const INITIAL_NUMBER_WIDTH = '30rem';

// DOM elements
const guessInput = document.querySelector('.guess');
const messageElement = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const numberElement = document.querySelector('.number');
const bodyElement = document.querySelector('body');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');

let secretNumber = generateSecretNumber();
let score = INITIAL_SCORE;
let highScore = 0;

/**
 * Display message to DOM message element
 * @param {string} message
 */
const displayMessage = function (message) {
  messageElement.textContent = message;
};

function generateSecretNumber() {
  return Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}

checkButton.addEventListener('click', function () {
  const guess = Number(guessInput.value);

  // When there's no input
  if (!guess) {
    displayMessage('🚨 No number!');
    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('✅ Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    // change background color
    document.querySelector('body').style.backgroundColor = '#60b347';
    // change number width
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    // When the guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        (messageElement.textContent =
          guess > secretNumber ? 'Too high!' : 'Too low!')
      );
      score--;

      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('🤦‍♂️ You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

againButton.addEventListener('click', function () {
  score = INITIAL_SCORE;
  secretNumber = generateSecretNumber();
  scoreElement.textContent = score;
  displayMessage('Start guessing...');
  numberElement.textContent = '?';
  guessInput.value = '';
  bodyElement.style.backgroundColor = INITIAL_BACKGROUND_COLOR;
  numberElement.style.width = INITIAL_NUMBER_WIDTH;
});
