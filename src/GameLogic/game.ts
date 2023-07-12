/* 7, 8, 9, 10, J, Q, K, A
 only 32 cards
pick random dealer, then deal all cards so all players have same amount 
for 3 player: 10 cards per
 4 : 7
  5: 6

place remaining cards face down on the table, these are called blind cards

 to left of dealer goes first, then proceed clock wise 


Sheepshead divides the entire deck into trump cards and fail cards. 
There are 14 designated trump cards. 
They are are, in order of highest to lowest:

Queen of Clubs, Queen of Spades, Queen of Hearts, Queen of Diamonds
Jack of Clubs, Jack of Spades, Jack of Hearts, Jack of Diamonds
Diamond-suited cards A, 10, K, 9, 8, 7

The remaining fail cards (18 in all) are ranked slightly differently 
than what most players will be familiar with. From highest to lowest:

Ace of Clubs, Ace of Spades, Ace of Hearts
Ten of Clubs, Ten of Spades, Ten of Hearts
King of Clubs, King of Spades, King of Hearts
Nine of Clubs, Nine of Spades, Nine of Hearts
Eight of Clubs, Eight of Spades, Eight of Hearts
Seven of Clubs, Seven of Spades, Seven of Hearts


the game logic:
 -  at start of hand, player can chose to pick up blind cards, doing so named them the picker
 - they get a picker puck placed under their seat to indicate this 

  * after taking the blind cards, then the picker will discard 2 cards

 next the picker picks a player to combine their cards with for the score at the end of the hand
 1 The picker states that whoever holds the Jack of Diamonds is their partner. This is the most common method.
 2 The picker may name the Ace of Hearts, Ace of Clubs, or Ace of Spades and whoever holds this card becomes their partner.

 *** partners are not shared publicly 

 if no one picks the cards you can do: 
  1 Leaster - The person who scores the fewest points wins. There is no picker and no partners.
  2 Doubler - All of the cards are reshuffled and new hands are dealt to all players. 
              There is no picker and no partners. Points lost and gained at the end of this round are doubled.


on each turn, players play a card to the center of the table following the previous cards suit if possible
person with the highest value card takes the 'trick' 
'tricks' then continue until all hands are empty 
you then gain or lose points 
cards are shuffled and then deat again 
players are then given the option to take their blind cards or to pass
 
player who wins the tricks begins the new trick

steps: 
TAKING A TURN
Play a card onto the trick pile, matching the previously played suit if possible.
When all players have added a card, the player who placed the highest-value card takes the trick.

Combine the scores of the picker and their partner, then the scores of the other players.
If the picking team gets 61 or more card points, the picker earns 2 points and their partner earns 1. 
All other players lose 1 point. Indicate this on the Player Points counter.

If the picking team earns less than 60 card points, the picker loses 2 points and their partner loses 1. 
All other players will gain 1 point.

If the picking team wins and the other team doesn't earn more than 30 card points,
 double the points each player wins or loses in this round.

If the non-picking team wins and the picking team doesn't earn more than 30 points,
 double the points each player wins or loses in this round.

If the picking team takes all of the tricks and earns the full 120 points,
 they earn three times the usual points for the round, and the other team loses three times the usual points.

If the non-picking team takes all of the tricks, the picker loses three times
 the usual points and the winning team earns three times the usual points.
 Note that the picker's partner receives no penalty in this scenario.
*/

// 7, 8, 9, 10, J, Q, K, A


/* 
objects for the game: 

PLAYER 3-5
a player can:
have a hand of cards
give a card of that hand to the game pile
have a score
maintain an identifier that links to the cards in their hand 

A GAME 
can have players
can have everyones score
decides turn sequence
can store the 'team' that gets est. 
Deals cards based on amount of people 
creates new turn (cards on table)
calculates game scores at end of turn


*/

// class Player 
import {createDeck, shuffleDeck, DeckOfCards} from './deck';

export function player (id: string) {
  const player = {
    id,
    hand: [''],
    score: 0,
    isPicker: false,
    wonCards: [''],
    playCard: (card: string) => {
      //remove card from hand.
      // push to game deck 
      // is it possible for these two objects to see / manipulate
      //one another?
      const newHand = player.hand.filter(c => card === c)
      return {
        card: card,
        id: player.id
      }
    },
    resetForNextTurn: () => {
      player.hand = [''];
      player.isPicker = false;
    },
    resetForNextRound: () => { // this would be per game. post scoring. 
      player.resetForNextTurn();
      player.wonCards = [''];
    },
    resetForNewGame: () => { // wipe all
      player.resetForNextRound();
      player.score = 0;
    }
  }
  return player;
}

interface Player {
  id: string,
  hand: string[],
  score: number,
  playCard: Function,
  isPicker: boolean,
  resetForNextTurn: () => {},
  resetForNextRound: () => {},
  resetForNewGame: () => {}
}

interface Game {
  players: [Players],
  shuffledDeck: string[],
  currentCardsOnTable: number,
  currentPlayer: 0,
  picker: string,
  secretTeam: string,
  setScoreMode: string,
  newDeck: () => {},
  moveToNext: () => {},
  setPicker: () => {},
  setSecretAndOtherTeam: () => {},
  dealCards: () => {},
  newTurn: () => {},
  receiveCard: () => {},
  calculateHandWinner: () => {},
  calculateScore: () => number,
  resetPlayersForNewTurn: () => {},
  resetGameForNewTurn: () => {},
  resetAll: () => {}
}

type Players = [Player]

export function game(players: Players) {
  const game = {
    players: [...players], // this needs to be opt in
    shuffledDeck: [''],
    currentCardsOnTable: [], // this needs to have player id!!
    currentPlayer: 0,
    picker: '',
    secretTeam: [''],
    otherTeam: [''],
    setScoreMode: '', // leastor, doubler, picker(team)
    newDeck: () => {
      const deck = createDeck();
      game.shuffledDeck = shuffleDeck(deck);
    },
    moveToNext: () => {
      const current = game.currentPlayer
      if (current !== game.players.length -1) {
        game.currentPlayer += current;
      } else {
        game.currentPlayer = 0;
      }
    },
    setPicker: (playerId: string, players: Players) => {
      game.picker = playerId;
      // const count = players.length;
      // for(count)
      const index = players.map((p:Player) => p.id).indexOf(playerId)
      game.players[index].isPicker = true;
    },
    setSecretAndOtherTeam: (namedCard: string) => {
      // JD AH AC AS
      //when a player picks
      // 1 The picker states that whoever holds the Jack of Diamonds 
      // is their partner. This is the most common method.
      // 2 The picker may name the Ace of Hearts, Ace of Clubs, or Ace of Spades 
      // and whoever holds this card becomes their partner.

      players.forEach((player) => {
        if(player.id !== game.picker){
          const inHand: boolean = player.hand.some((card) => {
            return card === namedCard;
          })
          if (inHand) {
            game.secretTeam.push(player.id);
          } else {
            game.otherTeam.push(player.id)
          }
        } else {
          // push picker
          game.secretTeam.push(player.id); 
        }
      })
    },
    dealCards: () => {
      let cardCount: number = 0;
      const playerCount = game.players.length;
      const deck = game.shuffledDeck as DeckOfCards;
      if(playerCount === 3) {
        cardCount = 10;
      }else       if(playerCount === 4) {
        cardCount = 7;
      }      if(playerCount === 5) {
        cardCount = 6;
      }
      // this is wrong
      //3 cards per player
      //then 2 cards to the middle
      // then 3 cards to each player
      for(cardCount; cardCount > 0; cardCount--) {
        for(let playerCount = 0; playerCount <= game.players.length; playerCount++) {
          game.players[playerCount].hand.push(deck[cardCount])
        }
      }
    },
    newTurn: () => {

    },
    receiveCard: () => {

    },
    calculateHandWinner: () => {

    },
    calculateScore: (): number => {
      /*
      Ace - 11 points
Ten - 10 points
King - 4 points
Queen 3 points
Jack - 2 points
9, 8, 7 - no points 
      */
      //cardValues -- dont forget that the gameMode matters with this 
      // game.currentCardsOnTable
      let score = 0;
      //ok but sometimes the winner gets split with the trick
      game.currentCardsOnTable.forEach(c => {
        // score =+ c;
        // AD
        // first decide if its a trump card or a non trump card + its value 
      })
      // also return
      // {
      //   winner: idText,
      //   score: number
      // }
      return score;
    },
    resetPlayersForNewTurn: () => {
      game.players.forEach((p:Player) => p.resetForNextTurn());
    },
    resetGameForNewTurn: () => {
      game.picker = '';
      game.secretTeam = '';
      game.setScoreMode = '';
      game.currentPlayer = 0;
      game.currentCardsOnTable = [];
      game.newDeck();
      game.resetPlayersForNewTurn();
    },
    resetAll: () => {
      game.players.forEach((p:Player) => p.resetForNewGame());
      game.resetGameForNewTurn();
      game.
      
    }
  }
  return game;
}



