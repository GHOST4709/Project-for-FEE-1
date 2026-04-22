const wordList = ['SIGMA', 'SKIBIDI', 'FRONTEND', 'REACT', 'GAMING', 'LINUX'];
let currentWord = '';
let guessed = [];
let mistakes = 0;
const maxMistakes = 6;

function initGame() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessed = [];
    mistakes = 0;
    document.getElementById('status').innerText = `Guesses left: ${maxMistakes}`;
    updateWord();
    buildKeyboard();
}

function updateWord() {
    const display = currentWord.split('').map(l => guessed.includes(l) ? l : '_').join('');
    document.getElementById('word').innerText = display;
    if (!display.includes('_')) {
        document.getElementById('status').innerText = "You Survived! 🎉";
        disableAll();
    }
}

function buildKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.classList.add('key');
        btn.innerText = letter;
        btn.addEventListener('click', () => makeGuess(letter, btn));
        keyboard.appendChild(btn);
    }
}

function makeGuess(letter, btn) {
    btn.disabled = true;
    guessed.push(letter);
    if (currentWord.includes(letter)) {
        updateWord();
    } else {
        mistakes++;
        document.getElementById('status').innerText = `Guesses left: ${maxMistakes - mistakes}`;
        if (mistakes >= maxMistakes) {
            document.getElementById('word').innerText = currentWord;
            document.getElementById('status').innerText = "Game Over! 💀";
            disableAll();
        }
    }
}

function disableAll() {
    document.querySelectorAll('.key').forEach(b => b.disabled = true);
}

function resetGame() { initGame(); }

initGame();




