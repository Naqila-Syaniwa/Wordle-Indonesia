import { words } from './words.js';

export class Game {
    constructor() {
        // Daftar kata 5 huruf Bahasa Indonesia
        this.words = words;
        this.word = this.getRandomWord();
        this.maxAttempts = 6;
        this.currentAttempt = '';
        this.attempts = [];
        this.finished = false;
        this.message = '';
    }

    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

    addLetter(letter) {
        if (this.finished || this.currentAttempt.length >= 5) return;
        this.currentAttempt += letter;
    }

    removeLetter() {
        if (this.finished) return;
        this.currentAttempt = this.currentAttempt.slice(0, -1);
    }

    submitAttempt() {
        if (this.finished || this.currentAttempt.length < 5) {
            this.message = 'Kata harus 5 huruf!';
            return;
        }

        const result = this.checkWord(this.currentAttempt);
        this.attempts.push(result);
        this.currentAttempt = '';

        if (result.every(tile => tile.status === 'correct')) {
            this.message = 'Selamat! Kamu menang 🎉';
            this.finished = true;
        } else if (this.attempts.length >= this.maxAttempts) {
            this.message = `Game over 😢 Kata yang benar: ${this.word}`;
            this.finished = true;
        } else {
            this.message = '';
        }
    }

    checkWord(guess) {
        const result = [];
        const target = this.word.split('');
        const guessLetters = guess.split('');

        for (let i = 0; i < 5; i++) {
            let status = 'wrong';
            if (guessLetters[i] === target[i]) {
                status = 'correct';
                target[i] = null;
            } else if (target.includes(guessLetters[i])) {
                status = 'wrong-position';
                target[target.indexOf(guessLetters[i])] = null;
            }
            result.push({ letter: guessLetters[i], status });
        }
        return result;
    }

    renderBoard() {
        let html = '';

        for (let i = 0; i < this.maxAttempts; i++) {
            const attempt = this.attempts[i] || [];
            const isCurrent = i === this.attempts.length;
            const row = [];

            for (let j = 0; j < 5; j++) {
                let letter = '';
                let className = 'tile';

                if (attempt[j]) {
                    letter = attempt[j].letter;
                    className += ` ${attempt[j].status}`;
                } else if (isCurrent && this.currentAttempt[j]) {
                    letter = this.currentAttempt[j];
                }

                row.push(`<div class="${className}">${letter}</div>`);
            }

            html += `<div class="row">${row.join('')}</div>`;
        }

        return html;
    }

    getMessage() {
        return this.message;
    }

    resetGame() {
        this.word = this.getRandomWord();
        this.currentAttempt = '';
        this.attempts = [];
        this.finished = false;
        this.message = 'Game baru dimulai! Tebak kata 5 huruf.';
    }
}
