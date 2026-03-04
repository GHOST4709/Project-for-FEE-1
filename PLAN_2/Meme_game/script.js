// <<<<<<< HEAD

// =======
// >>>>>>> 6ab2e56aab8e74a3c5b95da639766fa6c6e4cb4b
const memeSet = [
    { img: "images/AAG.gif", video: "C:\Users\Abhishek Sharma\My Frist Project\Project For FEE-1\PLAN_2\sounds\Bachan.mp3" },
    { img: "images/aura.gif", video: "2.mp4" },
    { img: "images/Baby.gif", video: "3.mp4" },
    { img: "images/boat.gif", video: "4.mp4" },
    { img: "images/cid.gif", video: "5.mp4" },
    { img: "images/coffin.gif", video: "6.mp4" },
    { img: "images/crying.gif", video: "7.mp4" },
    { img: "images/dap.gif", video: "8.mp4" },
    { img: "images/girl.gif", video: "9.mp4" },
    { img: "images/guy.gif", video: "10.mp4" },
    { img: "images/lmao.gif", video: "11.mp4" },
    { img: "images/mygif.gif", video: "12.mp4" },
    { img: "images/people.gif", video: "13.mp4" },
    { img: "images/suspecios.gif", video: "14.mp4" },
    { img: "images/white.gif", video: "15.mp4" },
    { img: "images/AAG.gif", video: "16.mp4" },
    { img: "images/AAG.gif", video: "17.mp4" },
    { img: "images/AAG.gif", video: "18.mp4" },
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
const bgVideo = document.getElementById("bgVideo");
const matchSound = document.getElementById("matchSound");
const wrongSound = document.getElementById("wrongSound");

let firstCard, secondCard, lockBoard;
let score = 0;
let time = 0;
let timerInterval;


function startGame() {
    board.innerHTML = "";
    score = 0;
    time = 0;
    lockBoard = false;
    updateUI();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("time").textContent = time;
    }, 1000);

    const size = document.getElementById("difficulty").value;
    const totalCards = size * size;
    const neededPairs = totalCards / 2;

    let cards = [];
    for (let i = 0; i < neededPairs; i++) {
        cards.push(memeSet[i % memeSet.length]);
    }

    cards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    board.style.gridTemplateColumns = `repeat(${size}, 80px)`;

    cards.forEach(data => createCard(data));
}

// Card Data function call

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


//----------------------------------Card Data vibe fix--------------------------------------------

function flipCard(card, data) {

    // Prevent clicking while board locked
    if (lockBoard) return;

    // 🔹 If clicking same card again → deselect
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
        matchSound.currentTime = 0;
        matchSound.play().catch(err => console.log("Audio blocked:", err));
        score += 10;

    
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

        firstCard.card.style.pointerEvents = "none";
        secondCard.card.style.pointerEvents = "none";
        
    
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

    
        firstCard.card.style.pointerEvents = "none";
        secondCard.card.style.pointerEvents = "none";

        playMeme(firstCard.data.video);
        resetTurn();

    } 
    else {
        wrongSound.play();

        setTimeout(() => {
            firstCard.card.classList.remove("flip");
            secondCard.card.classList.remove("flip");
            resetTurn();
        }, 900);
    }
    updateUI();
}

// Plays vids from vid src

function playMeme(video) {
    bgVideo.src = video;
    bgVideo.play();
}

function updateUI() {
    document.getElementById("score").textContent = score;
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}



// Resets the Gamme and back to its original vals

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

    bgVideo.pause();
    bgVideo.src = "";

    matchSound.pause();
    wrongSound.pause();
    matchSound.currentTime = 0;
    wrongSound.currentTime = 0;
}
