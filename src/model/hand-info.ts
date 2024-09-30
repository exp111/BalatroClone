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

export class HandInfo {
  public AllCards: Card[];
  public ValidCards: Card[];
  public Score: number;
  public Mult: number;
  public Type: HandType;

  constructor(cards: Card[]) {
    this.AllCards = cards;
    [this.Type, this.ValidCards] = this.calcType();
    this.Score = HandInfo.GetScore(this.Type);
    this.Mult = HandInfo.GetMult(this.Type);
  }

  calcType(): [HandType, Card[]] {
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
    let allAmount: Record<Suit, Record<Value, number>> = {
      [Suit.Club]: {...valueAmount},
      [Suit.Diamond]: {...valueAmount},
      [Suit.Spade]: {...valueAmount},
      [Suit.Heart]: {...valueAmount},
    }
    for (let card of this.AllCards) {
      valueAmount[card.value]++;
      suitAmount[card.suit]++;
      allAmount[card.suit][card.value]++;
    }
    let hasRecordAnyCount = (r: {}, c: number) => {
      return Object.values(r).filter(v => v == c).length;
    }
    let getValueHandOfCount = (c: number, amount: number = 1) => {
      let filtered = Object.entries(valueAmount).filter(([k, v]) => v == c);
      if (filtered.length >= amount) {
        // sort by value, get the highest one
        let sortedValues = filtered.sort(([_a, a], [_b, b]) => b - a);
        let cards = [];
        for (let i = 0; i < amount; i++) {
          if (sortedValues.length == 0) {
            console.error("not enough entries in sorted");
            return cards;
          }
          let k = sortedValues[0][0] as unknown as Value;
          cards.push(...this.AllCards.filter(c => c.value == k));
          sortedValues.shift(); // remove the first entry
        }
        return cards;
      } else {
        return null;
      }
    }
    let getSuitHandOfCount = (c: number) => {
      let filtered = Object.entries(suitAmount).filter(([k, v]) => v == c);
      if (filtered.length > 0) {
        let highest = Number.MIN_VALUE;
        let highestCards: Card[] = [];
        for (let [suit, _] of filtered) {
          let suitCards = this.AllCards
            .filter(c => c.suit == suit as unknown as number)
            .sort((a, b) => b.GetScore() - a.GetScore())
            .slice(0, c);
          let score = 0;
          for (let card of suitCards) {
            score += card.GetScore();
          }
          if (score > highest) {
            highest = score;
            highestCards = suitCards;
          }
        }
        return highestCards;
      } else {
        return null;
      }
    }
    let hasStraight = (flush: boolean): Card[] | null => {
      // if we're looking for a flush, run all suits, else only 1
      for (let suit = Suit.Club; suit < (flush ? Suit.Heart : Suit.Club + 1); suit++) {
        let count = 0;
        let start = Value.Two;
        for (let val = Value.Two; val < Value.Ace; val++) {
          // if we're in a straight, keep counting
          if ((flush && allAmount[suit][val] > 0) // only accept flush if we're in the same suit
            || (!flush && valueAmount[val] > 0)) {
            count++;
          } else {
            // reset count + start
            start = val;
            count = 0;
          }
          // check if we have a street
          if (count == 5) {
            let ret: Card[] = [];
            // find all cards from start and add them to the list
            for (let i = start; i < start + 5; i++) {
              let card = this.AllCards.find(c => (!flush || c.suit == suit) && c.value == i);
              if (!card) {
                console.error(`could not find card with suit ${suit} and val ${i} for straight`);
                return null;
              }
              ret.push(card);
            }
            return ret;
          }
        }
      }
      return null;
    }
    //TODO: return the one with the highest score
    let straightFlush = hasStraight(true);
    if (straightFlush) {
      return [HandType.StraightFlush, straightFlush];
    }
    let fourOfAKind = getValueHandOfCount(4);
    if (fourOfAKind) {
      return [HandType.FourOfAKind, fourOfAKind];
    }
    if (hasRecordAnyCount(valueAmount, 3) > 0 && hasRecordAnyCount(valueAmount, 2) > 0) {
      return [HandType.FullHouse, [...getValueHandOfCount(3)!, ...getValueHandOfCount(2)!]];
    }
    let flush = getSuitHandOfCount(5);
    if (flush) {
      return [HandType.Flush, flush];
    }
    let straight = hasStraight(false);
    if (straight) {
      return [HandType.Straight, straight];
    }
    let threeOfAKind = getValueHandOfCount(3);
    if (threeOfAKind) {
      return [HandType.ThreeOfAKind, threeOfAKind];
    }
    let twoPair = getValueHandOfCount(2, 2);
    if (twoPair) {
      return [HandType.TwoPair, twoPair];
    }
    let pair = getValueHandOfCount(2);
    if (pair) {
      return [HandType.Pair, pair];
    }
    // validate highest card
    return [HandType.HighCard, [this.AllCards.sort((a, b) => b.GetScore() - a.GetScore())[0]]];
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
