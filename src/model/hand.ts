import {Card, Suit, Value} from "./card";

export enum HandType {
  HighCard,
  Pair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush
}

export class Hand {
  static GetType(cards: Card[]) {
    let valueAmount: Record<Value, number> = {
      [Value.Two]: 0,
      [Value.Three]: 0,
      [Value.Four]: 0,
      [Value.Five]: 0,
      [Value.Six]: 0,
      [Value.Seven]: 0,
      [Value.Eight]: 0,
      [Value.Nine]: 0,
      [Value.Ten]: 0,
      [Value.Jack]: 0,
      [Value.Queen]: 0,
      [Value.King]: 0,
      [Value.Ace]: 0,
    };
    let suitAmount: Record<Suit, number> = {
      [Suit.Club]: 0,
      [Suit.Diamond]: 0,
      [Suit.Spade]: 0,
      [Suit.Heart]: 0,
    };
    for (let card of cards) {
      valueAmount[card.value]++;
      suitAmount[card.suit]++;
    }
    let hasRecordAnyCount = (r: {}, c: number) => {
      return Object.values(r).filter(v => v == c).length;
    }
    let hasStraight = () => {
      let count = 0;
      for (let i = Value.Two; i < Value.Ace; i++) {
        if (valueAmount[i] > 0) {
          count++;
        } else {
          count = 0;
        }
        if (count == 5) {
          return true;
        }
      }
      return false;
    }
    //TODO: return the one with the highest score
    if (hasStraight() && hasRecordAnyCount(suitAmount, 5)) {
      //FIXME: returns true if seperate flush and flush
      return HandType.StraightFlush;
    }
    if (hasRecordAnyCount(valueAmount, 4) > 0) {
      return HandType.FourOfAKind;
    }
    if (hasRecordAnyCount(valueAmount, 3) > 0 && hasRecordAnyCount(valueAmount, 2) > 0) {
      return HandType.FullHouse;
    }
    if (hasRecordAnyCount(suitAmount, 5) > 0) {
      return HandType.Flush;
    }
    if (hasStraight()) {
      return HandType.Straight;
    }
    if (hasRecordAnyCount(valueAmount, 3) > 0) {
      return HandType.ThreeOfAKind;
    }
    if (hasRecordAnyCount(valueAmount, 2) > 1) {
      return HandType.TwoPair;
    }
    if (hasRecordAnyCount(valueAmount, 2) > 0) {
      return HandType.Pair;
    }
    return HandType.HighCard;
  }

  static GetScore(type: HandType) {
    switch (type) {
      case HandType.HighCard:
        return 5;
      case HandType.Pair:
        return 10
      case HandType.TwoPair:
        return 20;
      case HandType.ThreeOfAKind:
        return 30;
      case HandType.Straight:
        return 30;
      case HandType.Flush:
        return 35;
      case HandType.FullHouse:
        return 40;
      case HandType.FourOfAKind:
        return 60;
      case HandType.StraightFlush:
        return 100;
      default:
        return 1;
    }
  }

  static GetMult(type: HandType) {
    switch (type) {
      case HandType.HighCard:
        return 1;
      case HandType.Pair:
      case HandType.TwoPair:
        return 2;
      case HandType.ThreeOfAKind:
        return 3;
      case HandType.Straight:
      case HandType.Flush:
      case HandType.FullHouse:
        return 4;
      case HandType.FourOfAKind:
        return 7;
      case HandType.StraightFlush:
        return 8;
      default:
        return 1;
    }
  }
}
