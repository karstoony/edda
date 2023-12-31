const boardSize = 3; // Size of each small tic-tac-toe board
const totalBoards = 9; // Total number of small boards

let currentPlayer = 'X';
let gameBoard = initializeBoard();
let currentBoardIndex = null;
let previousBoardIndex = null;

function initializeBoard() {
    const board = [];
    for (let i = 0; i < totalBoards; i++) {
        const smallBoard = [];
        for (let j = 0; j < boardSize * boardSize; j++) {
            smallBoard.push('');
        }
        board.push(smallBoard);
    }
    return board;
}

let isFirstMove = true; 

function renderBoard() {
    const container = document.getElementById('super-tic-tac-toe');
    container.innerHTML = '';

    for (let i = 0; i < totalBoards; i++) {
        const smallBoard = document.createElement('div');
        smallBoard.classList.add('small-board');

        // Highlight the next board if it's not full
        if (
            lastMoveBoardIndex !== null &&
            i === lastMovePosition &&
            !gameBoard[i].every(cell => cell !== '')
        ) {
            smallBoard.classList.add('highlight-next');
        }

        // Highlight all available boards that are not completely full
        if (
            lastMoveBoardIndex !== null &&
            gameBoard[lastMoveBoardIndex].every(cell => cell !== '') &&
            gameBoard[i].some(cell => cell === '') &&
            !gameBoard[i].every(cell => cell !== '')
        ) {
            smallBoard.classList.add('highlight-available');
        }

        for (let j = 0; j < boardSize * boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gameBoard[i][j];
            cell.addEventListener('click', () => handleCellClick(i, j));
            smallBoard.appendChild(cell);
        }

        container.appendChild(smallBoard);
    }

    const title = document.getElementsByClassName('title')[0];
    if (isFirstMove) {
        title.textContent = 'Super Tic Tac Toe';
    } else {
        title.textContent = `Turn: ${currentPlayer}`;
    }
    isFirstMove = false; // Set isFirstMove to false after the first move
}

let lastMovePosition = null;
let lastMoveBoardIndex = null;

function handleCellClick(boardIndex, cellIndex) {
    if (canPlayInBoard(boardIndex, cellIndex) && gameBoard[boardIndex][cellIndex] === '') {
        gameBoard[boardIndex][cellIndex] = currentPlayer;
        lastMovePosition = cellIndex;
        lastMoveBoardIndex = cellIndex;
        previousBoardIndex = currentBoardIndex;
        currentBoardIndex = lastMovePosition; // Set to the next small board based on the last move
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        
        if (checkWin(boardIndex)) {
            updateBigBoard(boardIndex);
        }

        renderBoard();
    }
}

function canPlayInBoard(boardIndex, cellIndex) {
    // If the next board is already full, allow playing in any available small board
    if (lastMoveBoardIndex !== null && gameBoard[lastMoveBoardIndex].every(cell => cell !== '')) {
        return true;
    }

    // Allow playing in any spot within the newly selected small board
    return (
        lastMoveBoardIndex === null ||
        (lastMoveBoardIndex !== null && boardIndex === lastMovePosition)
    );
}





function checkWin(boardIndex) {
    const row = Math.floor(boardIndex / boardSize);
    const col = boardIndex % boardSize;

    // Check row, column, and diagonal for a win
    if (
        checkLine(gameBoard[boardIndex], 0, 1, 2) ||
        checkLine(gameBoard[boardIndex], 3, 4, 5) ||
        checkLine(gameBoard[boardIndex], 6, 7, 8) ||
        checkLine(gameBoard[boardIndex], 0, 3, 6) ||
        checkLine(gameBoard[boardIndex], 1, 4, 7) ||
        checkLine(gameBoard[boardIndex], 2, 5, 8) ||
        checkLine(gameBoard[boardIndex], 0, 4, 8) ||
        checkLine(gameBoard[boardIndex], 2, 4, 6)
    ) {
        return true;
    }

    return false;
}

function checkLine(board, a, b, c) {
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
}

function updateBigBoard(boardIndex) {
    const winnerSymbol = currentPlayer === 'X' ? 'O' : 'X';
    gameBoard[boardIndex] = gameBoard[boardIndex].map(() => winnerSymbol);
}

renderBoard();
