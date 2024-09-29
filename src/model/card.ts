import {enumToName} from "../enumUtils";

export enum Suit {
  Club,
  Diamond,
  Spade,
  Heart,
  END
}

export enum Value {
  One = 1,
  Two,
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
  Ace,
  END
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

  GetName() {
    return `${this.GetValueName()} of ${this.GetSuitName()}`;
  }
}
