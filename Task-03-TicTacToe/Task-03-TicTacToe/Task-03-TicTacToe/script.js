let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

function checkWinner() {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return true;
    }

    if (!board.includes("")) {
        message.innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function cellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => cell.innerText = "");
    message.innerText = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", cellClick));
