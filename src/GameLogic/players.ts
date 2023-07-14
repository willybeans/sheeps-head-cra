import {cardScoreValues} from './deck';
export interface GamePlayer {
  id: string,
  hand: string[],
  score: number,
  wonCardsTotal: number,
  cardToPlay: TableCard,
  playCard: Function,
  isPicker: boolean,
  wonCards: string[],
  getTotalForCards: () => void,
  resetForNextTurn: () => void,
  resetForNextRound: () => void,
  resetForNewGame: () => void
}

export type Players = GamePlayer[]

export interface TableCard {
  player: string,
  card: string,
}

export function player (id: string): GamePlayer {
  const player = {
    id,
    hand: [''],
    score: 0,
    wonCardsTotal: 0,
    isPicker: false,
    cardToPlay: {
      player: '',
      card: ''
    }, // this might belong in the front end
    wonCards: [''],
    playCard: (card: string) => {
      const index = player.hand.indexOf(card);
      player.hand.splice(index, 1) // returns new array
      // const newHand = player.hand.filter(c => card === c)
      player.cardToPlay = {
        card,
        player: player.id
      }
    },
    getTotalForCards: () => {
            /*
      Ace - 11 points
      Ten - 10 points
      King - 4 points
      Queen 3 points
      Jack - 2 points
      9, 8, 7 - no points 
      */
      player.wonCards.forEach((c:string) => {
        const split = c.split('');
        const cardType = split[0];
        const suit = split[1]; // this might not matter
        player.wonCardsTotal += cardScoreValues[cardType]
      })
    },
    resetForNextTurn: () => {
      player.hand = [''];
      player.isPicker = false;
      player.cardToPlay = {
        player: '',
        card: ''
      }
    },
    resetForNextRound: () => { // if each round is from setting gameMode to scoring
      player.resetForNextTurn();
      player.wonCards = [''];
      player.wonCardsTotal = 0;
    },
    resetForNewGame: () => { // wipe all
      player.resetForNextRound();
      player.score = 0;
    }
  }
  return player;
}
