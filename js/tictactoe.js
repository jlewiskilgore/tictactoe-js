$( document ).ready(function() {
	startGame();
})

var spaceNames= ["top-left", "top-center", "top-right", "middle-left", "middle-center", "middle-right", "bottom-left", "bottom-center", "bottom-right"];
var player1Symbol = "X";
var player2Symbol = "O";
var numberOfPlayers = 1; // 1 for player vs. computer OR 2 for player vs. player
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
	// Listen for player 1's button choice
	if(spaceButton.value == " " && player == 1) {
		spaceButton.value = player1Symbol;
		moves++;
		checkForWin();
		currentPlayer = 2;
		// If this is a one player game, have computer player make a move
		if(numberOfPlayers == 1 && !isGameOver) {
			computerMove = computerPlayerTurn();
			spaceButton = document.getElementById(computerMove);
			spaceButton.value = player2Symbol;
			moves++;
			checkForWin();
			currentPlayer = 1;
		}
	}
	// List for player 2's button choice is a 2 player game
	else if(spaceButton.value == " " && player == 2 && numberOfPlayers == 2) {
		spaceButton.value = player2Symbol;
		moves++;
		checkForWin();
		currentPlayer = 1;
	}
}

function checkForWin() {
	// Get the current values of each space on the board
	var topLeft = document.getElementById(spaceNames[0]).value;
	var topCenter = document.getElementById(spaceNames[1]).value;
	var topRight = document.getElementById(spaceNames[2]).value;
	var midLeft = document.getElementById(spaceNames[3]).value;
	var midCenter = document.getElementById(spaceNames[4]).value;
	var midRight = document.getElementById(spaceNames[5]).value;
	var botLeft = document.getElementById(spaceNames[6]).value;
	var botCenter = document.getElementById(spaceNames[7]).value;
	var botRight = document.getElementById(spaceNames[8]).value;

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

// "Win Threat" is when any winning condition is currently satisfied by two
// matching symbols plus a blank space.
function checkForWinThreats(playerSymbol) {
	// Get the current values of each space on the board
	var topLeft = document.getElementById(spaceNames[0]);
	var topCenter = document.getElementById(spaceNames[1]);
	var topRight = document.getElementById(spaceNames[2]);
	var midLeft = document.getElementById(spaceNames[3]);
	var midCenter = document.getElementById(spaceNames[4]);
	var midRight = document.getElementById(spaceNames[5]);
	var botLeft = document.getElementById(spaceNames[6]);
	var botCenter = document.getElementById(spaceNames[7]);
	var botRight = document.getElementById(spaceNames[8]);

	// Check for wins across each row for win threat
	if(topLeft !== " " && topLeft == topCenter && topLeft == topRight) {
		
	}
	else if(midLeft !== " " && midLeft == midCenter && midLeft == midRight) {
		
	}
	else if(botLeft !== " " && botLeft == botCenter && botLeft == botRight) {
		
	}
	// Check for wins down each column for win threat
	else if(topLeft !== " " && topLeft == midLeft && topLeft == botLeft) {
		
	}
	else if(topCenter !== " " && topCenter == midCenter && topCenter == botCenter) {
		
	}
	else if(topRight !== " " && topRight == midRight && topRight == botRight) {
		
	}
	// Check for wins down the diagonals for win threat
	else if(topLeft !== " " && topLeft == midCenter && topLeft == botRight) {
		
	}
	else if(topRight !== " " && topRight == midCenter && topRight == botLeft) {
		
	}
}

function isSpaceOpen(spaceId) {
	var boardSpace = document.getElementById(spaceId);

	return (boardSpace.value == " ");
}

// Function to return a random space that is currently open
function makeRandomMove() {
	var randomSpaceIdx;

	do {
		randomSpaceIdx = getRandomIntInclusive(0,8);
		foundOpen = isSpaceOpen(spaceNames[randomSpaceIdx]);
		if(foundOpen) {
			console.log(spaceNames[randomSpaceIdx]);
			return spaceNames[randomSpaceIdx];
		}
	}while(!foundOpen)
}

// Get a random int from a range includsive
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick the best space for the computer player to make next move
// @return id of the html element of the board space to make move
function computerPlayerTurn() {
	var moveTo;
	// Look for moves for win

	// Look to block other player's win

	// Check if center space is still open
	if(isSpaceOpen(spaceNames[4])) {
		moveTo = spaceNames[4];
	}
	else {
		moveTo = makeRandomMove();
	}

	return moveTo;
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
