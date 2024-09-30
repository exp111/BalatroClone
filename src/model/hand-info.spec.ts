import {HandInfo, HandType} from "./hand-info";
import {Card, Suit, Value} from "./card";

const HAND_SIZE = 5;

describe('HandInfo', () => {
  beforeEach(() => {
  });
  it('high card', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Two, Value.Three, Value.Four, Value.Five]));
    expect(info.Type).toBe(HandType.HighCard);
    expect(info.ValidCards).toHaveSize(1);
  });
  it('pair', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Ace, Value.Three, Value.Four, Value.Five]));
    expect(info.Type).toBe(HandType.Pair);
    expect(info.ValidCards).toHaveSize(2);
  });
  it('two pair', () => {
    let info = new HandInfo(generateHandValues([Value.Ace, Value.Ace, Value.Ace, Value.Ace, Value.Five]));
    expect(info.Type).toBe(HandType.TwoPair);
    expect(info.ValidCards).toHaveSize(4);
  });
});

function generateHandValues(values: number[]) {
  let cards = [];
  let suit = Suit.Club;
  for (let value of values) {
    cards.push(new Card(suit++ % Suit.Heart, value));
  }
  return cards;
}
