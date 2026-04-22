const wordList = ['SIGMA', 'SKIBIDI', 'FRONTEND', 'GAMING', 'ARCH', 'FINESHYT', ''];
let currentWord = '';
let guessed = [];
let mistakes = 0;
const maxMistakes = 6;

function initGame() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessed = [];
    mistakes = 0;
    
    document.getElementById('status').innerText = `Guesses left: ${maxMistakes}`;
    document.getElementById('status').style.color = '#a0aec0'; // Reset color
    
    // Hide all stickman parts on reset
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`part-${i}`).style.display = 'none';
    }

    updateWord();
    buildKeyboard();
}

function updateWord() {
    const display = currentWord.split('').map(l => guessed.includes(l) ? l : '_').join('');
    document.getElementById('word').innerText = display;
    
    if (!display.includes('_')) {
        document.getElementById('status').innerText = "You Survived! 🎉";
        document.getElementById('status').style.color = '#4facfe';
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
        
        // Reveal the stickman part corresponding to the mistake number
        document.getElementById(`part-${mistakes}`).style.display = 'block';

        if (mistakes >= maxMistakes) {
            document.getElementById('word').innerText = currentWord;
            document.getElementById('status').innerText = "Game Over! 💀";
            document.getElementById('status').style.color = '#ff6b6b';
            
            // Turn the stickman red on game over
            document.getElementById('figure').setAttribute('stroke', '#ff6b6b');
            
            disableAll();
        }
    }
}

function disableAll() {
    document.querySelectorAll('.key').forEach(b => b.disabled = true);
}

function resetGame() { 
    // Reset stickman color back to neon blue
    document.getElementById('figure').setAttribute('stroke', '#4facfe');
    initGame(); 
}

// Start the game on load
initGame();
