// 1. Check Authentication on Page Load
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../Login/login.html';
        return;
    }
    document.getElementById('welcome-text').innerText = `Welcome, ${currentUser}`;
    loadDailyDrop();
};

// 2. Handle Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../Login/login.html';
}

// 3.Memes & Quotes
const subtleMemes = [
    "It’s not a bug, it’s just a soon to be Feature.",
    "Lag is my only real enemy. 📶",
    "I don't need to save, I like to live dangerously. (Saves 5 times anyway)",
    "My code worked yesterday. I haven't changed anything. Today it's broken.",
    "There are 10 types of people: those who understand binary, and those who don't.",
    "First rule of programming: If it works, don't touch it. ⚠️",
    "Me: *places a single block in Minecraft*. Teacher: Architecture!",
    "A Wise Man Once said: What?",
    "A Junior Intern Once said: Why not Use a forLoop to Search a DB with millons of users?"
];

function loadDailyDrop() {
    const memeElement = document.getElementById('daily-meme');
    const randomMeme = subtleMemes[Math.floor(Math.random() * subtleMemes.length)];
    memeElement.innerText = randomMeme;
}


