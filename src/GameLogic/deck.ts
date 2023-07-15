interface Cards {
  [key: string]: string;
}

interface Values {
  [key: string]: number;
}

const cardSuites: Cards = {
  D: 'diamonds',
  S: 'spades',
  H: 'hearts',
  C: 'clubs'
};

const cardTypes: Cards = {
  K: 'king',
  J: 'jack',
  Q: 'queen',
  A: 'ace',
  T: '10',
  N: '9',
  E: '8',
  S: '7'
};

/* 
Ace - 11 points
Ten - 10 points
King - 4 points
Queen 3 points
Jack - 2 points
9, 8, 7 - no points
*/

export const cardScoreValues: Values = {
  A: 11,
  T: 10,
  K: 4,
  Q: 3,
  J: 2,
  N: 0,
  E: 0,
  S: 0
};

// Card strength ratings from highest to lowest
// Queen of Clubs, Queen of Spades, Queen of Hearts, Queen of Diamonds
// Jack of Clubs, Jack of Spades, Jack of Hearts, Jack of Diamonds
// Diamond-suited cards A, 10, K, 9, 8, 7
// Ace of Clubs, Ace of Spades, Ace of Hearts
// Ten of Clubs, Ten of Spades, Ten of Hearts
// King of Clubs, King of Spades, King of Hearts
// Nine of Clubs, Nine of Spades, Nine of Hearts
// Eight of Clubs, Eight of Spades, Eight of Hearts
// Seven of Clubs, Seven of Spades, Seven of Hearts

export const cardComparativeValues: Values = {
  // trump cards
  QC: 32,
  QS: 31,
  QH: 30,
  QD: 29,
  JC: 28,
  JS: 27,
  JH: 26,
  JD: 25,
  AD: 24,
  TD: 23,
  KD: 22,
  ND: 21,
  ED: 20,
  SD: 19,
  // fail cards
  AC: 18,
  AS: 17,
  AH: 16,
  TC: 15,
  TS: 14,
  TH: 13,
  KC: 12,
  KS: 11,
  KH: 10,
  NC: 9,
  NS: 8,
  NH: 7,
  EC: 6,
  ES: 5,
  EH: 4,
  SC: 3,
  SS: 2,
  SH: 1
};

export type DeckOfCards = Array<string>;

export const createDeck = (): DeckOfCards => {
  let arr: DeckOfCards = [];

  for (const suit in Deck.cardSuites) {
    for (const type in Deck.cardTypes) {
      arr.push(suit + type);
    }
  }

  return arr;
};

export const shuffleDeck = (deck: DeckOfCards): DeckOfCards => {
  let numOfCards: number = 32;
  let shuffledDeck: DeckOfCards = [];
  for (numOfCards; numOfCards >= 1; numOfCards--) {
    let rndInt = Math.floor(Math.random() * (numOfCards - 0 + 1) + 0);
    if (deck.length === rndInt) {
      rndInt--;
    }
    shuffledDeck.push(deck[rndInt]);

    deck.splice(rndInt, 1);
  }
  return shuffledDeck;
};

export const Deck = {
  cardSuites,
  cardTypes,
  cardComparativeValues,
  cardScoreValues,
  shuffleDeck,
  createDeck
};
