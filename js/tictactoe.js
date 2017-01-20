$( document ).ready(function() {
	startGame();
})

var player1Symbol = "X";
var player2Symbol = "O";
var currentPlayer;
var isGameOver;

function startGame() {
    currentPlayer = 1; //Player 1 starts the game
    isGameOver = 0;
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

//Return true if a valid move was made
function markPlayerSpace(player, space) {
	var spaceButton = document.getElementById(space);
	if(spaceButton.value == " " && player == 1) {
		spaceButton.value = player1Symbol;
		currentPlayer = 2;
	}
	else if(spaceButton.value == " " && player == 2) {
		spaceButton.value = player2Symbol;
		currentPlayer = 1;
	}
}
