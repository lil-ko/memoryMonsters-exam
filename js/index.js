var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

function noGame(){
	audioWrong.play();	
	// Shake the yes button
	var yesBtn = document.querySelector('.yesBtn');
	console.log(yesBtn);
		setTimeout(function () {
			yesBtn.classList.add('shakeBtn');
			setTimeout(function() {	
				yesBtn.classList.remove('shakeBtn');
			}, 1000);	
		}, 50);	
}

function yesGame(){
	audioRight.play();
	window.location='game.html';
}