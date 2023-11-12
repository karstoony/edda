const boardSize = 3; // Size of each small tic-tac-toe board
const totalBoards = 3; // Total number of small boards

let currentPlayer = 'X';
let gameBoard = initializeBoard();

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

function renderBoard() {
    const container = document.getElementById('super-tic-tac-toe');
    container.innerHTML = '';

    for (let i = 0; i < totalBoards; i++) {
        const smallBoard = document.createElement('div');
        smallBoard.classList.add('small-board');

        for (let j = 0; j < boardSize * boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gameBoard[i][j];
            cell.addEventListener('click', () => handleCellClick(i, j));
            smallBoard.appendChild(cell);
        }

        container.appendChild(smallBoard);
    }
}

function handleCellClick(boardIndex, cellIndex) {
    if (gameBoard[boardIndex][cellIndex] === '') {
        gameBoard[boardIndex][cellIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderBoard();
        // Add your game logic for checking a winner or switching boards here
    }
}

renderBoard();