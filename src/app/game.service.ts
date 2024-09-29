import {Injectable} from '@angular/core';
import {Card, Suit, Value} from "../model/card";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  Deck: Card[] = [];
  Hand: Card[] = [];
  Discard: Card[] = [];

  score = 0;
  timesPlayed = 0;
  timesDiscarded= 0;
  // amount of times player is able to play/discard
  PLAY_COUNT = 3;
  DISCARD_COUNT = 4;
  // max amount of cards in hand
  HAND_SIZE = 6;
  // max amount of cards one can play
  MAX_PLAY_SIZE = 5;

  constructor() {
    (window as any).game = this;
    this.buildDeck();
    this.shuffle();
    this.drawHand();
  }

  buildDeck() {
    for (let suit = 0; suit < Suit.END; suit++) {
      for (let value = 0; value < Value.END; value++) {
        this.Deck.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    for (let i = this.Deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.Deck[i], this.Deck[j]] = [this.Deck[j], this.Deck[i]];
    }
  }

  drawHand() {
    while (this.Hand.length < this.HAND_SIZE) {
      // stop drawing if deck is empty
      if (this.Deck.length == 0) {
        break;
      }
      this.Hand.push(this.Deck.pop()!);
    }
  }

  onCardClicked(card: Card) {
    if (card.selected) {
      // unselect card if it was selected
      card.selected = false;
    } else {
      // only select card if we can select anymore
      if (this.Hand.filter(c => c.selected).length < this.MAX_PLAY_SIZE) {
        card.selected = true;
      }
    }
  }

  canPlay() {
    return this.Hand.some(h => h.selected) && this.timesPlayed < this.PLAY_COUNT;
  }

  canDiscard() {
    return this.Hand.some(h => h.selected) && this.timesDiscarded < this.DISCARD_COUNT;
  }

  onPlayClicked() {
    if (!this.canPlay()) {
      return;
    }
    this.timesPlayed++;
    this.Hand.forEach(c => c.selected = false);
  }

  onDiscardClicked() {
    if (!this.canDiscard()) {
      return;
    }
    this.timesDiscarded++;
    // discard those which were selected
    let toDiscard = this.Hand.filter(c => c.selected);
    for (let card of toDiscard) {
      card.selected = false;
      this.Discard.push(card);
    }
    // keep in hand those which werent discarded
    this.Hand = this.Hand.filter(c => !toDiscard.includes(c));
    this.drawHand();
  }
}
