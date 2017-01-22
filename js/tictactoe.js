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
	var moveTo = ""; // Move to make that will complete or block threat
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
	// TOP ROW
	if(topLeft.value == " " && topCenter.value == playerSymbol && topCenter.value == topRight.value) {
		moveTo = topLeft.id;
	}
	else if(topCenter.value == " " && topLeft.value == playerSymbol && topLeft.value == topRight.value) {
		moveTo = topCenter.id;
	}
	else if(topRight.value == " " && topCenter.value == playerSymbol && topCenter.value == topLeft.value) {
		moveTo = topRight.id;
	}
	// MIDDLE ROW
	else if(midLeft.value == " " && midCenter.value == playerSymbol && midCenter.value == midRight.value) {
		moveTo = midLeft.id;
	}
	else if(midCenter.value == " " && midLeft.value == playerSymbol && midLeft.value == midRight.value) {
		moveTo = midCenter.id;
	}
	else if(midRight.value == " " && midCenter.value == playerSymbol && midCenter.value == midLeft.value) {
		moveTo = midRight.id;
	}
	// BOTTOM ROW
	else if(botLeft.value == " " && botCenter.value == playerSymbol && botCenter.value == botRight.value) {
		moveTo = botLeft.id;
	}
	else if(botCenter.value == " " && botLeft.value == playerSymbol && botLeft.value == botRight.value) {
		moveTo = botCenter.id;
	}
	else if(botRight.value == " " && botCenter.value == playerSymbol && botCenter.value == botLeft.value) {
		moveTo = botRight.id;
	}

	// Check for wins down each column for win threat
	// LEFT COLUMN
	else if(topLeft.value == " " && midLeft.value == playerSymbol && midLeft.value == botLeft.value) {
		moveTo = topLeft.id;
	}
	else if(midLeft.value == " " && topLeft.value == playerSymbol && topLeft.value == botLeft.value) {
		moveTo = midLeft.id;
	}
	else if(botLeft.value == " " && topLeft.value == playerSymbol && topLeft.value == midLeft.value) {
		moveTo = botLeft.id;
	}
	// CENTER COLUMN
	else if(topCenter.value == " " && midCenter.value == playerSymbol && midCenter.value == botCenter.value) {
		moveTo = topCenter.id;
	}
	else if(midCenter.value == " " && topCenter.value == playerSymbol && topCenter.value == botCenter.value) {
		moveTo = midCenter.id;
	}
	else if(botCenter.value == " " && topCenter.value == playerSymbol && topCenter.value == midCenter.value) {
		moveTo = botCenter.id;
	}
	// RIGHT COLUMN
	else if(topRight.value == " " && midRight.value == playerSymbol && midRight.value == botRight.value) {
		moveTo = topRight.id;
	}
	else if(midRight.value == " " && topRight.value == playerSymbol && topRight.value == botRight.value) {
		moveTo = midRight.id;
	}
	else if(botRight.value == " " && topRight.value == playerSymbol && topRight.value == midRight.value) {
		moveTo = botRight.id;
	}

	// Check for wins down the diagonals for win threat
	// DIAGONAL LEFT TO RIGHT
	else if(topLeft.value == " " && midCenter.value == playerSymbol && midCenter.value == botRight.value) {
		moveTo = topLeft.id;
	}
	else if(midCenter.value == " " && topLeft.value == playerSymbol && topLeft.value == botRight.value) {
		moveTo = midCenter.id;
	}
	else if(botRight.value == " " && topLeft.value == playerSymbol && topLeft.value == midCenter.value) {
		moveTo = botRight.id;
	}
	// DIAGONAL RIGHT TO LEFT
	else if(topRight.value == " " && midCenter.value == playerSymbol && midCenter.value == botLeft.value) {
		moveTo = topRight.id;	
	}
	else if(midCenter.value == " " && topRight.value == playerSymbol && topRight.value == botLeft.value) {
		moveTo = midCenter.id;	
	}
	else if(botLeft.value == " " && topRight.value == playerSymbol && topRight.value == midCenter.value) {
		moveTo = botLeft.id;	
	}

	return moveTo;
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
	var moveTo = "";
	// Look for moves for win
	if(moveTo == "") {
		moveTo = checkForWinThreats(player2Symbol); // Check for win threats for player's own symbol
	}

	// Look to block other player's win
	if(moveTo == "") {
		moveTo = checkForWinThreats(player1Symbol); // Check for win threats for opponent player's symbol
	}

	// Check if center space is still open, else make a random move
	if(moveTo == "") {
		if(isSpaceOpen(spaceNames[4])) {
			moveTo = spaceNames[4];
		}
		else {
			moveTo = makeRandomMove();
		}
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

function clearGameBoard() {
	for(var i=0; i < spaceNames.length; i++) {
		document.getElementById(spaceNames[i]).value = " ";
	}
}

function resetGame() {
	clearGameBoard();
	startGame();

	var results = document.getElementById("game-results");
	var gameBoard = document.getElementById("tictactoe-board");

	results.style.display = "none";
	gameBoard.style.display = "inline";
}
