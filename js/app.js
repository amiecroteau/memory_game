const card = document.getElementsByClassName('card');
const cards = ["fa-diamond", "fa-diamond",
	"fa-paper-plane-o", "fa-paper-plane-o",
	"fa-anchor", "fa-anchor",
	"fa-bolt", "fa-bolt",
	"fa-cube", "fa-cube",
	"fa-leaf", "fa-leaf",
	"fa-bomb", "fa-bomb",
	"fa-bicycle", "fa-bicycle",

];


var moveCounter = document.querySelector('.moves');
let moves = 0;



const deck = document.querySelector('.deck');

const refresh = document.querySelector('.restart');
refresh.addEventListener('click',function () {
	window.location.reload(false);
});


//referenced this shuffle function by https://css-tricks.com/snippets/javascript/shuffle-array/ as the provided
//function was not working for me and providing an error for array.length

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
function generateCard() {

	for (let i = 0; i < 16; i++) {
		let list = document.createElement("li");

		deck.appendChild(list);
		list.className = "card";

		let info = document.createElement("i");

		list.appendChild(info);
		info.className = `fa ${cards[i]} "data-set=" ${cards}`;

	}

}

generateCard();

Shuffle(cards);

//The following logic was helped along after watching the Mike Wales Youtube walkthrough

let allCards = document.querySelectorAll('.card');
let openCards = [];


allCards.forEach(function (card) {
	card.addEventListener('click', function (e) {
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');


			if (openCards.length == 2) {

				//checking to see if the cards match
				if (openCards[0].innerHTML === openCards[1].innerHTML) {

					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');

					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');

					openCards = [];
				} else {

					//no match
					setTimeout(function (openCards) {
						allCards.forEach(function (card) {
							card.classList.remove('open', 'show');
						});

					}, 1500);

					openCards = [];
					moves += 1;
					moveCounter.innerHTML = moves;

				}

				starCounter();
			}
		}
	});
});


//Thanks to fellow Fender Matthew Crawford's walkthrough, I utilized style.display property and his for of for statement to work.https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/

let stars = document.querySelectorAll('.stars li');

function starCounter() {

for (let a = 0; a<20; a++){
	if (moves > 10) {

		console.log(stars);

		for (star of stars) {
			stars[2].style.display = 'none';
		}

	} else if (moves > 8) {

		for (star of stars) {
			stars[1].style.display = 'none';
		}
	} else if (moves > 5){
		for (star of stars) {
			stars[0].style.display = 'none';
		}
	}
}

}




