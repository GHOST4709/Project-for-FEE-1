let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

function initGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.addEventListener('click', () => handleCellClick(cellEl, index));
        board.appendChild(cellEl);
    });
}

function handleCellClick(cell, index) {
    if (boardState[index] !== '' || !gameActive) return;
    boardState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#4facfe' : '#f093fb';
    checkWin();
}

function checkWin() {
    let roundWon = false;
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true; break;
        }
    }
    if (roundWon) {
        document.getElementById('status').innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false; return;
    }
    if (!boardState.includes('')) {
        document.getElementById('status').innerText = "It's a Draw!";
        gameActive = false; return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = `Player X's Turn`;
    initGame();
}

initGame();

