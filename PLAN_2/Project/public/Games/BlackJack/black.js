const suits = ['♠', '♥', '♣', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];
let playerHand = [];
let dealerHand = [];
let balance = 1000;
let currentBet = 0;
let gameActive = false;

// Load balance from local storage if it exists
if (localStorage.getItem('arcadeBalance')) {
    balance = parseInt(localStorage.getItem('arcadeBalance'));
}
updateBalanceDisplay();

function buildDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function placeBet() {
    const betInput = document.getElementById('bet-amount');
    let bet = parseInt(betInput.value);

    if (bet > balance) {
        showMessage("Insufficient funds! 💸", "#ff6b6b");
        return;
    }
    if (bet <= 0 || isNaN(bet)) {
        showMessage("Enter a valid bet.", "#ff6b6b");
        return;
    }

    currentBet = bet;
    balance -= currentBet;
    updateBalanceDisplay();
    saveBalance();

    startGame();
}

function startGame() {
    gameActive = true;
    buildDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    document.getElementById('betting-controls').classList.add('hidden');
    document.getElementById('action-controls').classList.remove('hidden');
    document.getElementById('reset-controls').classList.add('hidden');
    showMessage(`Bet: $${currentBet}. Hit or Stand?`, "#a0aec0");

    renderBoard(false);
    checkBlackjack();
}

function renderBoard(showDealerCard) {
    // Render Player
    const playerDiv = document.getElementById('player-cards');
    playerDiv.innerHTML = '';
    playerHand.forEach(card => playerDiv.appendChild(createCardElement(card)));
    document.getElementById('player-score').innerText = calculateScore(playerHand);

    // Render Dealer
    const dealerDiv = document.getElementById('dealer-cards');
    dealerDiv.innerHTML = '';
    
    if (!showDealerCard) {
        dealerDiv.appendChild(createCardElement(dealerHand[0]));
        let hiddenCard = document.createElement('div');
        hiddenCard.className = 'card hidden-card';
        dealerDiv.appendChild(hiddenCard);
        document.getElementById('dealer-score').innerText = "?";
    } else {
        dealerHand.forEach(card => dealerDiv.appendChild(createCardElement(card)));
        document.getElementById('dealer-score').innerText = calculateScore(dealerHand);
    }
}

function createCardElement(card) {
    const el = document.createElement('div');
    const isRed = card.suit === '♥' || card.suit === '♦';
    el.className = `card ${isRed ? 'red' : 'black'}`;
    el.innerHTML = `${card.value}<br>${card.suit}`;
    return el;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            score += 11;
            aces += 1;
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }
    return score;
}

function hit() {
    if (!gameActive) return;
    playerHand.push(deck.pop());
    renderBoard(false);

    if (calculateScore(playerHand) > 21) {
        endRound("Bust! You lose. 💀", false);
    }
}

function stand() {
    if (!gameActive) return;
    gameActive = false;
    renderBoard(true);

    // Dealer rules: Hit until 17
    function dealerTurn() {
        if (calculateScore(dealerHand) < 17) {
            dealerHand.push(deck.pop());
            renderBoard(true);
            setTimeout(dealerTurn, 800); //delay for suspense
        } else {
            resolveWinner();
        }
    }
    setTimeout(dealerTurn, 800);
}

function resolveWinner() {
    const pScore = calculateScore(playerHand);
    const dScore = calculateScore(dealerHand);

    if (dScore > 21) {
        endRound("Dealer busts! You win! 💰", true);
    } else if (pScore > dScore) {
        endRound("You win! 💰", true);
    } else if (dScore > pScore) {
        endRound("Dealer wins. 🛑", false);
    } else {
        endRound("Push! It's a tie. 🤝", 'tie');
    }
}

function checkBlackjack() {
    const pScore = calculateScore(playerHand);
    if (pScore === 21) {
        endRound("BLACKJACK! 🔥", 'blackjack');
    }
}

function endRound(msg, isWin) {
    gameActive = false;
    renderBoard(true); // Reveal dealer's card
    
    let extraText = "";

    // Calculate payouts and append the profit to the message
    if (isWin === true) {
        balance += currentBet * 2;
        extraText = ` (+$${currentBet})`; // Normal win profit
    } else if (isWin === 'blackjack') {
        balance += currentBet * 2.5; // Pays 3:2
        extraText = ` (+$${currentBet * 1.5})`; // Blackjack profit
    } else if (isWin === 'tie') {
        balance += currentBet; // Give bet back
        extraText = ` (Bet Returned)`;
    }

    // Show the final message with the added money text
    showMessage(msg + extraText, isWin === true || isWin === 'blackjack' ? "#1dd1a1" : "#ff6b6b");

    currentBet = 0;
    updateBalanceDisplay();
    saveBalance();

    document.getElementById('action-controls').classList.add('hidden');
    document.getElementById('reset-controls').classList.remove('hidden');
}

function showMessage(text, color) {
    const msgEl = document.getElementById('message');
    msgEl.innerText = text;
    msgEl.style.color = color || 'white';
}

function updateBalanceDisplay() {
    document.getElementById('balance').innerText = balance;
}

function saveBalance() {
    localStorage.setItem('arcadeBalance', balance);
}

function resetRound() {
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    document.getElementById('player-score').innerText = '';
    document.getElementById('dealer-score').innerText = '';
    showMessage("Place your bet to start!", "white");
    
    document.getElementById('reset-controls').classList.add('hidden');
    document.getElementById('betting-controls').classList.remove('hidden');
}
