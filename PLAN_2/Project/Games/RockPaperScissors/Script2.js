

const options = ['Rock', 'Paper', 'Scissors'];

function play(userChoice) {
    const compChoice = options[Math.floor(Math.random() * 3)];
    let outcome = '';

    if (userChoice === compChoice) {
        outcome = "It's a tie! 🤝";
    } else if (
        (userChoice === 'Rock' && compChoice === 'Scissors') ||
        (userChoice === 'Paper' && compChoice === 'Rock') ||
        (userChoice === 'Scissors' && compChoice === 'Paper')
    ) {
        outcome = "You Win! 🔥";
    } else {
        outcome = "Computer Wins! 🤖";
    }

    document.getElementById('status').innerText = `Computer chose ${compChoice}`;
    document.getElementById('result').innerText = outcome;
}


