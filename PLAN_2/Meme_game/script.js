// <<<<<<< HEAD

// =======
// >>>>>>> 6ab2e56aab8e74a3c5b95da639766fa6c6e4cb4b
const memeSet = [
    { img: "images/AAG.gif", audio: "sounds/Bachan.mp3" },
    { img: "images/Baby.gif", audio: "sounds/baby.mp3" },
    { img: "images/boat.gif", audio: "sounds/aura.mp3" },
    { img: "images/cid.gif", audio: "sounds/ACP.mp3" },
    { img: "images/coffin.gif", audio: "sounds/dance.mp3" },
    { img: "images/crying.gif", audio: "sounds/cryingman.mp3" },
    { img: "images/dap.gif", audio: "sounds/dapp.mp3" },
    { img: "images/girl.gif", audio: "NO_SOUND" },
    { img: "images/guy.gif", audio: "sounds/guy.mp3" },
    { img: "images/lmao.gif", audio: "sounds/lmao.mp3" },
    { img: "images/mygif.gif", audio: "sounds/troll.mp3" },
    { img: "images/people.gif", audio: "sounds/people.mp3" },
    { img: "images/suspecios.gif", audio: "sounds/sus.mp3" },
    { img: "images/nigga.jpg", audio: "sounds/niggga.mp3" },     
    { img: "images/arjun.gif", audio: "sounds/arjun.mp3" },
    { img: "images/deku.gif", audio: "sounds/all_might.mp3" },
    { img: "images/files.gif", audio: "sounds/filez.mp3" },
    { img: "images/hakla.gif", audio: "sounds/srk_laugh.mp3" },
    { img: "images/giga.gif", audio: "sounds/gigachad.mp3" },
    { img: "images/thala.gif", audio: "sounds/thala.mp3" },
    { img: "images/RickRoll.gif", audio: "sounds/RickRoll.mp3" },
    { img: "images/brainrot.png", audio: "sounds/brainrot.mp3" },
    { img: "images/dexter.gif", audio: "sounds/dexter-meme.mp3" },
    { img: "images/FAA.gif", audio: "sounds/faaah.mp3" },
];
// const memeSet = [
//     { img: "images/meme1.jpg", video: "videos/meme1.mp4" },
//     { img: "images/meme2.jpg", video: "videos/meme2.mp4" },
//     { img: "images/meme3.jpg", video: "videos/meme3.mp4" },
//     { img: "images/meme4.jpg", video: "videos/meme4.mp4" },
//     { img: "images/meme5.jpg", video: "videos/meme1.mp4" },
//     { img: "images/meme6.jpg", video: "videos/meme2.mp4" }
// ];

const board = document.getElementById("gameBoard");

// const bgVideo = document.getElementById("bgVideo");


let firstCard, secondCard, lockBoard;
let score = 0;
let time = 0;
let timerInterval;
let memeAudio;




//-----------------------HERE EVERYTHING STARTS!!! ! !---------------------------


function startGame() {
    board.innerHTML = "";
    score = 0;
    time = 0;
    lockBoard = false;
    updateUI();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("time").textContent = time; // first increase then update 
    }, 1000);

    const size = document.getElementById("difficulty").value;
    const totalCards = size * size;
    const neededPairs = totalCards / 2;

    let cards = [];
    for (let i = 0; i < neededPairs; i++) {
        cards.push(memeSet[i % memeSet.length]);
    }

    cards = [...cards, ...cards].sort(() => Math.random() - 0.5); // created a copy to compare the cards array
    board.style.gridTemplateColumns = `repeat(${size}, 80px)`;

    cards.forEach(data => createCard(data));
}







// Card Data function call (Using DOM it creates/renders the cards to play the game)

function createCard(data) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="${data.img}">
            </div>
        </div>
    `;

    card.addEventListener("click", () => flipCard(card, data));
    board.appendChild(card);
}









//----------------------------------flip Card Data fix--------------------------------------------
// What does this funtion do?
// Prevent clicking if board is locked
// Prevent clicking same card again
// Flip the card
// Store first card
// Store second card
// QUALITY OF LIFE IMPROVEMENT!!
function flipCard(card, data) {

    // Prevent clicking while board locked
    if (lockBoard) return;

    // If clicking same card again → deselect
    if (firstCard && card === firstCard.card) {
        card.classList.remove("flip");
        firstCard = null;
        return;
    }

    // Prevent selecting already matched card again
    if (card.classList.contains("matched")) return;

    card.classList.add("flip");

    // First selection
    if (!firstCard) {
        firstCard = { card, data };
        return;
    }

    // Second selection
    secondCard = { card, data };
    lockBoard = true;

    checkMatch();
}//------------------------------------------------------------------------------






// Check for match match match

function checkMatch() {

    if (firstCard.data.img === secondCard.data.img) {
        
        score += 10; // chnage it in the future cuz this is for starters

        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

        firstCard.card.style.pointerEvents = "none";
        secondCard.card.style.pointerEvents = "none";

        playMeme(firstCard.data.audio);
        
        resetTurn();
    } 
    else {
        setTimeout(() => {
            firstCard.card.classList.remove("flip");
            secondCard.card.classList.remove("flip");
            resetTurn();
        }, 900); // breif card show
    }
    
    updateUI();
    
}

//---------------------------Plays vids from vid src---------------------------


function playMeme(audioSrc) {
    if (memeAudio) {
        memeAudio.pause();
    }
    memeAudio = new Audio(audioSrc); // creates object of sound
    memeAudio.currentTime = 0;
    memeAudio.play().catch(err => console.log("Audio blocked:", err));
}



function updateUI() {
    document.getElementById("score").textContent = score;
}


function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}



//--------------------------Resets the Gamme and back to its original vals--------------------------

function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    time = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    updateUI();
    document.getElementById("time").textContent = 0;

    board.innerHTML = "";

}
