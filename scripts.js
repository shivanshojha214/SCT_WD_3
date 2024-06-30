const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartBtn.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(cell, cellIndex);
    handleResultValidation();
}

function handleCellPlayed(cell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.style.pointerEvents = 'none'; // Disable further clicks on this cell
    cell.style.cursor = 'default'; // Change cursor style for clarity
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const posA = gameState[a];
        const posB = gameState[b];
        const posC = gameState[c];
        if (posA === '' || posB === '' || posC === '') {
            continue;
        }
        if (posA === posB && posB === posC) {
            roundWon = true;
            highlightWinningCells(a, b, c);
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        status.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.pointerEvents = 'auto'; // Re-enable clicks on cells
        cell.style.cursor = 'pointer'; // Restore default cursor style
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function highlightWinningCells(a, b, c) {
    cells[a].classList.add('winning-cell');
    cells[b].classList.add('winning-cell');
    cells[c].classList.add('winning-cell');
}
