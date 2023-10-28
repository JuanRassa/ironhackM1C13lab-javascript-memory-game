const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

const memoryGame = new MemoryGame(cards);

const victorySectionHTML = (numberOfPairs, numberOfClickedPairs) => {
  return `
    <div class="win-popup">
      <h3>You won!</h3>
      <p>You guessed all the ${numberOfPairs} pairs of cards in ${numberOfClickedPairs} attemps!</p>
      <div class="btns">
        <button id="play-again">Play again</button>
        <button id="take-me-out">Take me out</button>
      </div>
    </div>
  `;
};

window.addEventListener('load', event => {
  let html = '';
  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      console.log(`Card clicked: ${card}`);
      card.classList.toggle('turned');
      memoryGame.pickedCards.push(card);

      if (memoryGame.pickedCards.length === 2) {
        if (
          memoryGame.checkIfPair(memoryGame.pickedCards[0].getAttribute('data-card-name'), memoryGame.pickedCards[1].getAttribute('data-card-name'))
        ) {
          memoryGame.pickedCards.forEach(pairedCards => {
            pairedCards.classList.toggle('guessed');
          });
          memoryGame.pickedCards.length = 0;
        } else {
          setTimeout(() => {
            memoryGame.pickedCards.forEach(pickedCard => {
              pickedCard.classList.toggle('turned');
            });
            memoryGame.pickedCards.length = 0;
          }, 800);
        }
      }

      let pairsClicked = document.querySelector('#pairs-clicked');
      let pairsGuessed = document.querySelector('#pairs-guessed');
      pairsClicked.innerHTML = memoryGame.pairsClicked;
      pairsGuessed.innerHTML = memoryGame.pairsGuessed;

      if (memoryGame.checkIfFinished()) {
        const victorySectionElement = document.querySelector('#victory-section');
        victorySectionElement.innerHTML = victorySectionHTML(memoryGame.pairsGuessed, memoryGame.pairsClicked);
        victorySectionElement.style.display = 'flex';
        setTimeout(() => {
          victorySectionElement.style.opacity = '1';
        }, 300);

        const playAgain = document.querySelector('#play-again');
        const takeMeOut = document.querySelector('#take-me-out');

        playAgain.onclick = function () {
          location.reload();
        };
        takeMeOut.onclick = function () {
          location = 'https://google.com';
        };
      }
    });
  });
});
