const displayPlayer = document.querySelector(".displayPlayer");
const gameBoard = document.querySelector(".gameBoard");
const restart = document.querySelector(".restart");

let currentPlayer = "Player"; // Inizia con il Player
let gameActive = false; // Inizia il gioco solo dopo la scelta del segno
let moves = 0;
let cells = [];

let userSign = ""; // Memorizza il segno scelto dall'utente
let computerSign = ""; // Memorizza il segno del computer

window.addEventListener("load", showModal); // Mostra il modal quando la pagina viene caricata

// Funzione per mostrare il modal
function showModal() {
    const modal = document.getElementById("pickSignModal");
    modal.style.display = "flex";
}

// Inizia il gioco solo dopo che il segno è stato scelto
function startGameWithSign(sign) {
    userSign = sign;
    computerSign = userSign === "X" ? "O" : "X";

    const modal = document.getElementById("pickSignModal");
    modal.style.display = "none";

    currentPlayer = "Player";
    gameActive = true; // Abilita il gioco
    createGameBoard();
}
document.getElementById("chooseX").addEventListener("click", () => startGameWithSign("X"));
document.getElementById("chooseO").addEventListener("click", () => startGameWithSign("O"));

// Crea le celle del gioco
function createGameBoard() {
for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(cell));
        gameBoard.appendChild(cell);
        cells.push(cell);
    }
}

// Funzione per gestire il clic su una cella
function handleCellClick(cell) {
    if (!gameActive || cell.textContent !== "") return; // Non permette clic su celle già selezionate

    const sign = currentPlayer === "Player" ? userSign : computerSign;
    cell.textContent = sign;
    moves++;

    if (checkWin(sign)) {
        displayPlayer.textContent = currentPlayer + " wins!";
        gameActive = false;
        restart.style.display = "block";
    } else if (moves === 9) {
        displayPlayer.textContent = "It's a tie!";
        gameActive = false;
        restart.style.display = "block";
    } else {
        currentPlayer = currentPlayer === "Player" ? "Computer" : "Player";
        displayPlayer.textContent =  `${currentPlayer}'s turn`;

        if (currentPlayer === "Computer") {
            makeComputerMove();
        }
    }
}

// Funzione per determinare il vincitore
function checkWin(sign) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return cells[a].textContent === sign && cells[b].textContent === sign && cells[c].textContent === sign;
    });
}

// Simula la mossa del computer
function makeComputerMove() {
    setTimeout(() => {
        if (!gameActive) return; // Controlla se il gioco è ancora attivo
            const emptyCells = cells.filter((cell) => cell.textContent === "");
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            handleCellClick(randomCell);
    }, 1500);
}

// Funzione per riavviare il gioco
function restartGame() {
    showModal();
    
    cells.forEach((cell) => {
        cell.textContent = "";
    });

    currentPlayer = "Player";
    gameActive = false;
    moves = 0;
}
// restartButton.addEventListener("click", restartGame);