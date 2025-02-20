class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 11;

    this.shuffleCards();
  }

  shuffleCards() {
    // ... write your code here
    if (!this.cards) return undefined;
    for (let i = this.cards.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      this.cards.push(this.cards[randomIndex]);
      this.cards.splice(randomIndex, 1);
    }
    return this.cards;
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    // ... write your code here
    if (this.cards.length / 2 === this.pairsGuessed) {
      return true;
    } else {
      return false;
    }
  }
}
