let moves = 0;
let number = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
const timer = document.querySelector('.timer');
let time;

const shape = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', "fa-paper-plane-o",
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];

function startGame() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(shape).map(function(card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');

};

startGame();

function generateCard(card) {
    return `<li class='card' data-card='${card}'><i class='fa ${card}'></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

let sec = 0;
let tens = 0;
let min = 0;
let hour = 0;

function startTimer() {
    time = setInterval(function() {
        sec++
        if (sec > 9) {
            tens++;
            sec = 0;
        }
        if (tens == 6) {
            min++;
            tens = 0;

        }
        if (min == 6) {
            hour++;
            min = 0;
        }

        timer.innerHTML = `${hour}${min}:${tens}${sec}`;
    }, 1000)
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var cards = document.querySelectorAll('.card');
var opens = [];
var matchs = [];

var match = document.querySelector('match');

cards.forEach(function(card) {
    card.addEventListener('click', function(e) {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            if (opens.length > 1)
                return false;
            opens.push(card);
            card.classList.add('open', 'show');

            if (opens.length == 2) {
                ++moves;
                if (moves > 7) {
                    stars[2].style.visibility = 'collapse';
                }
                if (moves > 13) {
                    stars[1].style.visibility = 'collapse';
                }

                number.innerHTML = moves;

                if (moves == 1) {
                    startTimer();

                }

                if (opens[0].dataset.card == opens[1].dataset.card) {
                    opens[0].classList.add('match');
                    opens[1].classList.add('match');
                    opens[0].classList.add('open');
                    opens[1].classList.add('open');
                    opens[0].classList.add('show');
                    opens[1].classList.add('show');
                    matchs.push(card);
                    card.classList.add('match');
                    opens = [];

                    if (matchs.length == 8) {
                        setTimeout(function() {
                            showModal();
                        }, 1300)
                    }
                    if (matchs.length == 8) {
                        clearInterval(time);
                    }
                } else {
                    opens[0].classList.add('stop');
                    opens[1].classList.add('stop');

                    setTimeout(function() {
                        opens.forEach(function(card) {
                            card.classList.remove('open', 'show');

                            opens = [];
                        });

                    }, 1200);
                }
            }
        }
    }, );
}, );

var modal = $('#pop-win');

function showModal() {

    modal.css('display', 'block');
    endTime = timer.innerHTML;
    var starCount = document.querySelector('.stars').innerHTML;

    document.getElementById('endCount').innerHTML = moves;
    document.getElementById('starCount').innerHTML = starCount;
    document.getElementById('endTime').innerHTML = endTime;
    $('.play-again').on('click', function() {
        location.reload();
    });

}

const refresh = document.querySelector('.fa-repeat');

function reload() {
    location.reload();
}
refresh.addEventListener('click', reload);

