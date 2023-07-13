import { Deck } from './deck';

describe('Deck', () => {
  describe('createDeck', () => {
    it('should create a deck of cards with 32 cards', () => {
      const deck = Deck.createDeck();
      expect(deck).toHaveLength(32);
    });

    it('should contain unique cards', () => {
      const deck = Deck.createDeck();
      const uniqueCards = new Set(deck);
      expect(uniqueCards.size).toBe(32);
    });

    it('should have cards with valid suit and type combinations', () => {
      const deck = Deck.createDeck();
      const validSuits = Object.keys(Deck.cardSuites);
      const validTypes = Object.keys(Deck.cardTypes);

      for (const card of deck) {
        const suit = card[0];
        const type = card[1];

        expect(validSuits).toContain(suit);
        expect(validTypes).toContain(type);
      }
    });
  });

  describe('shuffleDeck', () => {
    it('should shuffle the deck without changing the number of cards', () => {
      const deck = Deck.createDeck();
      const shuffledDeck = Deck.shuffleDeck([...deck]);

      expect(shuffledDeck).toHaveLength(deck.length);
    });

    it('should contain the same cards as the original deck', () => {
      const deck = Deck.createDeck();
      const shuffledDeck = Deck.shuffleDeck([...deck]);

      for (const card of deck) {
        expect(shuffledDeck).toContain(card);
      }
    });

    it('should produce a different order than the original deck', () => {
      const deck = Deck.createDeck();
      const shuffledDeck = Deck.shuffleDeck([...deck]);

      expect(shuffledDeck).not.toEqual(deck);
    });
  });
});
