


const cards = ["fa-diamond", "fa-diamond",
	"fa-paper-plane-o", "fa-paper-plane-o",
	"fa-anchor", "fa-anchor",
	"fa-bolt", "fa-bolt",
	"fa-cube", "fa-cube",
	"fa-leaf", "fa-leaf",
	"fa-bomb", "fa-bomb",
	"fa-bolt", "fa-bolt",
];



const deck = document.querySelector('.deck');

function generateCard (){
	
    for(let i=0; i< cards.length;i++)
    {
	    let list=document.createElement("li");
	
		deck.appendChild(list);
		list.className="card";
		
		let info=document.createElement("i");
		
		list.appendChild(info);
		info.className=`fa ${cards[i]}`;
		
	}
	
}

generateCard ();

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}




const card = document.getElementsByClassName('card');

let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function (card) {
	console.log('itworks');
	card.addEventListener('click', function () {
		
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');
			

			if (openCards.length == 2) {
				if (openCards[0].dataset.card == openCards[1].dataset.card) {
					

					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');

					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');

					openCards = [];
				} else {

					console.log('itworks2');
					//no match
					setTimeout(function () {
						openCards.forEach(function (card) {
							card.classList.remove('open', 'show');
						});


						openCards = [];
					}, 1000);
				}
				//moves += 1;
			}

		}

	});


});

	
	
	
	




