//set variables

const card = document.getElementsByClassName('card');
const cards = ["fa-diamond", "fa-diamond",
	"fa-paper-plane-o", "fa-paper-plane-o",
	"fa-anchor", "fa-anchor",
	"fa-bolt", "fa-bolt",
	"fa-sun-o", "fa-sun-o",
	"fa-leaf", "fa-leaf",
	"fa-photo", "fa-photo",
	"fa-bicycle", "fa-bicycle",

];
const deck = document.querySelector('.deck');

//create move counter
const moveCounter = document.querySelector('.moves');
let moves = 0;

let matches = document.getElementsByClassName("match");
let modal = document.getElementById("end-modal");
let modalText = document.getElementById("end-text");
const newGameBtn = document.getElementById("newGame");
const endGameBtn = document.getElementById("closeGame");
//let timer = document.querySelector(".timer");
//let seconds = 0;
let running;

//followed fellow fender on slack Chris N for his timer post

//timer 
let sec = 0;
let min = 0;
let timer;

deck.addEventListener("click", function startTimer() {
	timer = setInterval(insertTime, 1500);
});

function stopTimer() {
	clearInterval(timer);
	sec = 0;
	min = 0;
}

function insertTime() {
	sec++;

	if (sec < 10) {
		sec = `0${sec}`;
	}

	if (sec >= 60) {
		min++;
		sec = "00";
	}

	// display time
	document.querySelector('.timer-output').innerHTML = "0" + min + ":" + sec;
}
//refresh game
const refresh = document.querySelector('.restart');
refresh.addEventListener('click', function restart() {
	window.location.reload(false);
});



//referenced this shuffle function by https://css-tricks.com/snippets/javascript/shuffle-array/ as the provided
//function was not working for me and providing an error for array.length
//Shuffle cards

function Shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
cards.sort(function () {
	return 0.25 - Math.random()
});

/*
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		cards[randomIndex] = temporaryValue;
		
	console.log('shuffleworks');
		
	}
return array;
}

shuffle();
*/

//create cards
function generateCard() {

	for (let i = 0; i < cards.length; i++) {
		let list = document.createElement("li");

		deck.appendChild(list);
		list.className = "card";

		let info = document.createElement("i");

		list.appendChild(info);
		info.className = `fa ${cards[i]} "data-set=" ${cards}`;

	}

}

generateCard();

//shuffle newest cards
Shuffle(cards);

//The following logic was helped along after watching the Mike Wales Youtube walkthrough
//compares matches

let allCards = document.querySelectorAll('.card');
let openCards = [];
let matched = [];

allCards.forEach(function (card) {
	card.addEventListener('click', function (e) {
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');


			if (openCards.length == 2) {

				//if a match
				if (openCards[0].innerHTML === openCards[1].innerHTML) {

					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');

					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');

					openCards = [];


					//no match
				} else {



					setTimeout(function (openCards) {

						allCards.forEach(function (card) {

							card.classList.remove('open', 'show');

						});

					}, 800);

					openCards = [];
					moves += 1;
					moveCounter.innerHTML = moves;

				}

				starCounter();
			}
			gameOver();
		}
	});
});
//check for match totals
/*function gameOver(matched){
	matched = allCards.getElementsByClassName('match');
					
	console.log (matched);

	
	}
*/
//Thanks to fellow Fender Matthew Cranford's walkthrough, I utilized style.display property and his for of for LOOP to check the moves to star ration.https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/

let stars = document.querySelectorAll('.stars li');

let starCount = 3;

function starCounter() {

	for (let a = 0; a < 20; a++) {
		if (moves > 20) {

			for (star of stars) {
				stars[2].style.display = 'none';
				//stars[2].style.display = 'none';
				starCount = 0;
			}

		} else if (moves > 15) {

			for (star of stars) {
				stars[1].style.display = 'none';
				starCount = 1;
			}
		} else if (moves > 10) {
			for (star of stars) {
				stars[0].style.display = 'none';
				starCount = 2;

			}
		}
	}
}


//once all matches are found a modal opens up and the timer stops

//pop up modal

function gameOver() {
	if (matches.length === cards.length) {
		clearInterval(running);
		modal.style.display = "block";
		if (starCount >= 2) {

			modalText.innerText = `Congratulations! You finished the game in ${moves} moves in ${min} minutes and ${sec} seconds. You've earned ${starCount} stars! What would you like to do next?`;
		} else {

			modalText.innerText = `Congratulations! You finished the game in ${moves} moves in ${min} minutes and ${sec} seconds. You've earned ${starCount} star! What would you like to do next?`;

		}

	}
}

//play again button

newGameBtn.addEventListener("click", function () {
	modal.style.display = "none";
	window.location.reload(false);

});

//end game button
endGameBtn.addEventListener("click", function () {
	modal.style.display = "none";
	window.close();

});
