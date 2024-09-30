import {HandInfo, HandType} from "./hand-info";
import {Card, Suit, Value} from "./card";

describe('HandInfo', () => {
  beforeEach(() => {
  });
  it('high card', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Two, Value.Three, Value.Four, Value.Five]));
    expect(info.Type).toBe(HandType.HighCard);
    expect(info.ValidCards).toHaveSize(1);
  });
  it('pair', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Ace, Value.Two, Value.Three, Value.Four]));
    expect(info.Type).toBe(HandType.Pair);
    expect(info.ValidCards).toHaveSize(2);
  });
  it('two pair', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Ace, Value.Two, Value.Two, Value.Three]));
    expect(info.Type).toBe(HandType.TwoPair);
    expect(info.ValidCards).toHaveSize(4);
  });
  it('three of a kind', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Ace, Value.Ace, Value.Two, Value.Three]));
    expect(info.Type).toBe(HandType.ThreeOfAKind);
    expect(info.ValidCards).toHaveSize(3);
  });
  it('straight', () => {
    let info = new HandInfo(generateHandValues([Value.Two, Value.Three, Value.Four, Value.Five, Value.Six]));
    expect(info.Type).toBe(HandType.Straight);
    expect(info.ValidCards).toHaveSize(5);
  });
  it('flush', () => {
    let info = new HandInfo(generateHandValues(
      [Value.Ace, Value.Three, Value.Four, Value.Five, Value.Six],
      [Suit.Spade, Suit.Spade, Suit.Spade, Suit.Spade, Suit.Spade]));
    expect(info.Type).toBe(HandType.Flush);
    expect(info.ValidCards).toHaveSize(5);
  });
  it('full house', () => {
    let info = new HandInfo(generateHandValues([Value.Two, Value.Two, Value.Two, Value.Three, Value.Three]));
    expect(info.Type).toBe(HandType.FullHouse);
    expect(info.ValidCards).toHaveSize(5);
  });
  it('four of a kind', () => {
    let info = new HandInfo(generateHandValues([Value.Two, Value.Two, Value.Two, Value.Two, Value.Three]));
    expect(info.Type).toBe(HandType.FourOfAKind);
    expect(info.ValidCards).toHaveSize(4);
  });
  it('straight flush', () => {
    let info = new HandInfo(generateHandValues([Value.Two, Value.Three, Value.Four, Value.Five, Value.Six],
      [Suit.Spade, Suit.Spade, Suit.Spade, Suit.Spade, Suit.Spade]));
    expect(info.Type).toBe(HandType.StraightFlush);
    expect(info.ValidCards).toHaveSize(5);
  });
});

function generateHandValues(values: number[], suitValues?: number[]) {
  let cards = [];
  for (let i = 0; i < values.length; i++) {
    let value = values[i];
    let suit = suitValues ? suitValues[i] : i % Suit.Heart;
    cards.push(new Card(suit, value));
  }
  return cards;
}
