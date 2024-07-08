// script.js

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
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

const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');
let isGameActive = true;

function handleCellClick(event) {
    console.log("Cell clicked");
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !isGameActive) {
        console.log("Cell already clicked or game is not active");
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    cell.classList.add('disabled');
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winCondition.forEach(index => {
                cells[index].classList.add('winning');
            });
            break;
        }
    }

    if (roundWon) {
        resultDisplay.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameActive = false;
        setTimeout(resetGame, 2000);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        resultDisplay.textContent = 'Draw!';
        setTimeout(resetGame, 2000);
        return;
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
        cell.classList.remove('winning');
    });
    currentPlayer = 'X';
    resultDisplay.textContent = '';
    isGameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
