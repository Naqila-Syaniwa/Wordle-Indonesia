import { Game } from './game.js';
import { Keyboard } from './keyboard.js';

const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

const game = new Game();
const keyboardInstance = new Keyboard(keyboard);

gameBoard.innerHTML = game.renderBoard();
keyboardInstance.render();

function updateUI() {
    gameBoard.innerHTML = game.renderBoard();
    message.textContent = game.getMessage();
}

keyboard.addEventListener('click', (event) => {
    if (!event.target.classList.contains('key')) return;
    const key = event.target.textContent.toLowerCase();

    if (key === 'enter') {
        game.submitAttempt();
    } else if (key === '⌫') {
        game.removeLetter();
    } else {
        game.addLetter(key);
    }
    updateUI();
});

document.addEventListener('keydown', (event) => {
    if (/^[a-z]$/.test(event.key)) {
        game.addLetter(event.key);
    } else if (event.key === 'Enter') {
        game.submitAttempt();
    } else if (event.key === 'Backspace') {
        game.removeLetter();
    }
    updateUI();
});

resetButton.addEventListener('click', () => {
    game.resetGame();
    updateUI();
});
