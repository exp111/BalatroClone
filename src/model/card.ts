import {enumToName} from "../enumUtils";

export enum Suit {
  Club,
  Diamond,
  Spade,
  Heart
}

export enum Value {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export class Card {
  suit: Suit;
  value: Value;
  selected = false;

  constructor(suit: Suit, value: Value) {
    this.suit = suit;
    this.value = value;
  }

  GetSuitName() {
    return enumToName(Suit, this.suit);
  }

  GetValueName() {
    switch (this.value) {
      case Value.Jack:
      case Value.Queen:
      case Value.King:
      case Value.Ace:
        return enumToName(Value, this.value);
      default:
        return this.value.toString();
    }
  }

  GetScore() {
    switch (this.value) {
      case Value.Jack:
      case Value.Queen:
      case Value.King:
        return 10;
      case Value.Ace:
        return 11;
      default:
        return this.value as number;
    }
  }

  GetName() {
    return `${this.GetValueName()} of ${this.GetSuitName()}`;
  }
}
