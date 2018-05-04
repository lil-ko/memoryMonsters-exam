// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 3;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioRight = new Audio('sound/right.mp3');
var audioWrong = new Audio('sound/wrong.mp3');

var startTime = null;
var endTime = null;
var gameOnGoing = false;
var isProcessing = false;

var name = null;
if (localStorage.getItem('bestTime') === null) {
	localStorage.setItem('bestTime',0);
	localStorage.setItem('bestUserName','Unknown... yet');
	setScoreTable();
}
					
do{
	name = prompt("What's your name?");
	if (name !== null) {
		localStorage.setItem('currUserName', name);
		localStorage.setItem('currTime', 0);
		console.log(name + " - stored");
		setScoreTable();
		}
}while (!name);

// This function is called whenever the user click a card
function cardClicked(elCard) {
	if (!isProcessing){
		if (!gameOnGoing){
			startTime = new Date().getTime();
			gameOnGoing = true;
			console.log(startTime + " - startTime");
		}
		// If the user clicked an already flipped card - do nothing and return from the function
		if (elCard.classList.contains('flipped')) {
			return;
		}

		// Flip it
		elCard.classList.add('flipped');

		// This is a first card, only keep it in the global variable
		if (elPreviousCard === null) {
        elPreviousCard = elCard;
		} else {
			// get the data-card attribute's value from both cards
			var card1 = elPreviousCard.getAttribute('data-card');
			var card2 = elCard.getAttribute('data-card');

			// No match, schedule to flip them back in 1 second
			if (card1 !== card2){
				audioWrong.play();
				isProcessing = true;
				setTimeout(function () {
					elCard.classList.remove('flipped');
					elPreviousCard.classList.remove('flipped');
					elPreviousCard = null;
					isProcessing = false;
				}, 1000)
			

			} else {
				// Yes! a match!
				audioRight.play();
				flippedCouplesCount++;
				elPreviousCard = null;

				// All cards flipped!
				if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
					audioWin.play();
					gameOnGoing = false;
					endTime = new Date().getTime();
					var currTime = endTime - startTime;
					localStorage.setItem('currTime',currTime);
					console.log('currTime' + currTime);
					setScoreTable();
					flippedCouplesCount = 0;
					document.querySelector('.actionBtns').classList.remove('hidden');
					
					// Define best score
					if (Number(localStorage.getItem('currTime')) < Number(localStorage.getItem('bestTime')) || localStorage.getItem('bestTime')==='0') {
						localStorage.setItem('bestTime',currTime);
						localStorage.setItem('bestUserName',localStorage.getItem('currUserName'));
						setScoreTable();
					}
					
					// Shake the logo
					var headerImg = document.querySelector('.headerImg');
					setTimeout(function () {
						headerImg.classList.add('shakeImg');
						setTimeout(function() {	
							headerImg.classList.remove('shakeImg');
						}, 3000);	
					}, 100);					
				}
			}
		}
	}
}


function changePlayer() {
	name = null;
	do{
	name = prompt("What's your name?");
	if (name !== null) {
		localStorage.setItem('currUserName', name);
		localStorage.setItem('currTime', 0);
		console.log(name + " - stored");
		setScoreTable();
		}
	}while (!name);
	playAgain();
}

function playAgain() {
	var cards = document.getElementsByClassName("card");
	var i;
	for (i=0; i < cards.length; i++) {
		cards[i].classList.remove('flipped');
		//shuffle
	}
	document.querySelector('.actionBtns').classList.add('hidden');
}

function resetScore() {
	localStorage.setItem('bestTime',0);
	localStorage.setItem('bestUserName','Unknown... yet');
	localStorage.setItem('currTime',0);
	setScoreTable();
	playAgain();
}

function setScoreTable() {
		document.getElementById("table").rows[0].cells.namedItem("bestTime").innerHTML = localStorage.getItem('bestTime');
		document.getElementById("table").rows[0].cells.namedItem("bestUserName").innerHTML = localStorage.getItem('bestUserName');
		document.getElementById("table").rows[1].cells.namedItem("currTime").innerHTML = localStorage.getItem('currTime');
		document.getElementById("table").rows[1].cells.namedItem("currUserName").innerHTML = localStorage.getItem('currUserName');

}




































