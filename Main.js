const gameBoard = document.getElementById('memory-game');


const cardsArray = [
    { name: 'meme1', img: 'https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif' }, 
    { name: 'meme2', img: 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif' }, 
    { name: 'meme3', img: 'https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif' }, 
    { name: 'meme1', img: 'https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif' },
    { name: 'meme2', img: 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif' },
    { name: 'meme3', img: 'https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif' },
    // Add more pairs here if you want a larger board
];


cardsArray.sort(() => 0.5 - Math.random());

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    cardsArray.forEach(item => {
        // Create card container
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name; 
        card.dataset.img = item.img;   

        // Create Front Face (The Meme)
        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = item.img;
        
        // Create Back Face (The Cover)
        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.innerText = "?"; // Or put a logo image here

        // Assemble
        card.appendChild(frontFace);
        card.appendChild(backFace);
        gameBoard.appendChild(card);

        // Add Click Event
        card.addEventListener('click', flipCard);
    });
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        // TRIGGER THE BACKGROUND EFFECT
        changeBackground(firstCard.dataset.img); 
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); // 1 second delay
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// 4. THE SPECIAL FEATURE: Change 
function changeBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}


createBoard();
