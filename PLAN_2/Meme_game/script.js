const cardsData = [
    { img: "images/AAG.gif", video: "videos/maka-bhosda-aag-meme-amitabh-bachan-made-with-Voicemod.mp3" },
    { img: "images/meme2.jpg", video: "videos/meme2.mp4" },
    { img: "images/meme3.jpg", video: "videos/meme3.mp4" },
    { img: "images/meme4.jpg", video: "videos/meme4.mp4" }
];


let cards = [...cardsData, ...cardsData]
    .sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");
const bgVideo = document.getElementById("bgVideo");
const bgAudio = document.getElementById("bgAudio");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let isPlaying = false;

function playMeme(src) {
    if (isPlaying) return;
    isPlaying = true;

    bgAudio.src = src;
    bgAudio.play().finally(() => {
        bgAudio.onended = () => isPlaying = false;
    });
}

function playMeme(src) {
    bgAudio.pause();          
    bgAudio.currentTime = 0;  
    bgAudio.src = src;
    bgAudio.play().catch(err => console.log(err));
}

cards.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="${cardData.img}">
            </div>
        </div>
    `;

    card.addEventListener("click", () => flipCard(card, cardData));
    board.appendChild(card);
});

function flipCard(card, cardData) {
    if (lockBoard || card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = { card, cardData };
        return;
    }

    secondCard = { card, cardData };
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    if (firstCard.cardData.img === secondCard.cardData.img) {
        playMeme(firstCard.cardData.video);
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove("flip");
            secondCard.card.classList.remove("flip");
            resetTurn();
        }, 1000);
    }
}

function playMeme(videoSrc) {
    bgVideo.src = videoSrc;
    bgVideo.play();
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
