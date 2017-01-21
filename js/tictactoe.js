$( document ).ready(function() {
	startGame();
})

var player1Symbol = "X";
var player2Symbol = "O";
var currentPlayer;
var isGameOver;
var moves;
var isDraw;

function startGame() {
    currentPlayer = 1; //Player 1 starts the game
    isGameOver = 0;
    isDraw = 0;
    moves = 0;
}

function checkSpace(space) {
	console.log("test");
	console.log(space);
	if(currentPlayer == 1) {
		markPlayerSpace(currentPlayer, space);
	}
	else if(currentPlayer == 2) {
		markPlayerSpace(currentPlayer, space);
	}
}

// Return true if a valid move was made
function markPlayerSpace(player, space) {
	var spaceButton = document.getElementById(space);
	if(spaceButton.value == " " && player == 1) {
		spaceButton.value = player1Symbol;
		moves++;
		checkForWin();
		currentPlayer = 2;
	}
	else if(spaceButton.value == " " && player == 2) {
		spaceButton.value = player2Symbol;
		moves++;
		checkForWin();
		currentPlayer = 1;
	}
}

function checkForWin() {
	// Get the current values of each space on the board
	var topLeft = document.getElementById("top-left").value;
	var topCenter = document.getElementById("top-center").value;
	var topRight = document.getElementById("top-right").value;
	var midLeft = document.getElementById("middle-left").value;
	var midCenter = document.getElementById("middle-center").value;
	var midRight = document.getElementById("middle-right").value;
	var botLeft = document.getElementById("bottom-left").value;
	var botCenter = document.getElementById("bottom-center").value;
	var botRight = document.getElementById("bottom-right").value;

	// Check for wins across each row
	if(topLeft !== " " && topLeft == topCenter && topLeft == topRight) {
		isGameOver = 1;
	}
	else if(midLeft !== " " && midLeft == midCenter && midLeft == midRight) {
		isGameOver = 1;
	}
	else if(botLeft !== " " && botLeft == botCenter && botLeft == botRight) {
		isGameOver = 1;
	}
	// Check for wins down each column
	else if(topLeft !== " " && topLeft == midLeft && topLeft == botLeft) {
		isGameOver = 1;
	}
	else if(topCenter !== " " && topCenter == midCenter && topCenter == botCenter) {
		isGameOver = 1;
	}
	else if(topRight !== " " && topRight == midRight && topRight == botRight) {
		isGameOver = 1;
	}
	// Check for wins down the diagonals
	else if(topLeft !== " " && topLeft == midCenter && topLeft == botRight) {
		isGameOver = 1;
	}
	else if(topRight !== " " && topRight == midCenter && topRight == botLeft) {
		isGameOver = 1;
	}
	else if(moves == 9) {
		console.log("drawww");
		isGameOver = 1;
		isDraw = 1;
	}

	if(isGameOver) {
		endGame();
	}
}

function endGame() {
	var results = document.getElementById("game-results");
	var winner = document.getElementById("winning-player");
	var gameBoard = document.getElementById("tictactoe-board");

	gameBoard.style.display = "none";
	results.style.display = "inline";

	if(!isDraw){
		winner.innerHTML = "Player " + currentPlayer + " wins!!!";
	}
	else {
		winner.innerHTML = "It's A Draw!!!";
	}
}
