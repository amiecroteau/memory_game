
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



const deck = document.querySelector('.deck');

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
						if (openCards[0].innerHTML === openCards[1].innerHTML) {

							openCards[0].classList.add('match');
							openCards[0].classList.add('open');
							openCards[0].classList.add('show');

							openCards[1].classList.add('match');
							openCards[1].classList.add('open');
							openCards[1].classList.add('show');

							openCards = [];
						} else {
							setTimeout(function (openCards) {
								allCards.forEach(function (card) {
									card.classList.remove('open', 'show');
								});
							
							}, 500);
							//no match
							openCards = [];
						}
						//moves += 1;
					}

				}

			});
});