let board = null;
let game = new Chess();
let statusEl = document.getElementById('status');

// Handles when a piece is picked up by the player
function onDragStart(source, piece, position, orientation) {
    // Do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // Only allow White pieces to be dragged (Player is White, Bot is Black)
    if (piece.search(/^b/) !== -1 || game.turn() === 'b') {
        return false;
    }
}

// Handles when the player drops a piece
function onDrop(source, target) {
    // See if the move is legal
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to a queen for simplicity
    });

    // If illegal move, snap piece back
    if (move === null) return 'snapback';

    updateStatus();

    // If game is not over, trigger the API bot to make a move
    if (!game.game_over()) {
        statusEl.innerText = "Computer is thinking... 🤖";
        window.setTimeout(makeComputerMove, 250);
    }
}

// Fetches the best move from the Stockfish API
async function makeComputerMove() {
    try {
        const fen = game.fen();
        // Depth 10 provides a solid opponent without making the API wait too long
        const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=10`);
        const data = await response.json();
        
        if (data.success) {
            // The API returns a string like "bestmove e7e5 ponder d2d4"
            const bestMove = data.data.split(' ')[1]; 
            
            const fromSquare = bestMove.substring(0, 2);
            const toSquare = bestMove.substring(2, 4);
            const promotion = bestMove.length > 4 ? bestMove.charAt(4) : 'q';

            game.move({
                from: fromSquare,
                to: toSquare,
                promotion: promotion
            });
        } else {
            throw new Error("API did not return success");
        }
    } catch (error) {
        console.error("API failed, using fallback random move.", error);
        
        // Fallback: If the API fails, pick a random legal move so the game doesn't freeze
        let possibleMoves = game.moves();
        if (possibleMoves.length > 0) {
            let randomIdx = Math.floor(Math.random() * possibleMoves.length);
            game.move(possibleMoves[randomIdx]);
        }
    }

    // Update the board visuals and status text after the bot moves
    board.position(game.fen());
    updateStatus();
}

// Update the board position after the piece snap animation
function onSnapEnd() {
    board.position(game.fen());
}

// Updates the text status (Checkmate, Draw, or Turn)
function updateStatus() {
    let statusHTML = '';
    let moveColor = (game.turn() === 'w') ? 'White' : 'Black';

    if (game.in_checkmate()) {
        statusHTML = `Game over, ${moveColor} is in checkmate. 💀`;
    } else if (game.in_draw()) {
        statusHTML = 'Game over, drawn position 🤝';
    } else {
        statusHTML = `${moveColor} to move`;
        if (game.in_check()) {
            statusHTML += ', ' + moveColor + ' is in check! ⚠️';
        }
    }
    statusEl.innerText = statusHTML;
}

// Board configuration
let config = {
    // THIS IS THE NEW LINE: It tells the board where to fetch the piece images
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
    
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

// Initialize the board
board = Chessboard('board', config);
updateStatus();

// Reset button logic
function resetBoard() {
    game.reset();
    board.start();
    updateStatus();
}