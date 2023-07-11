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

import { Deck } from './deck';

type DeckOfCards = Array<string>

export const createDeck = ():DeckOfCards => {
  let arr:DeckOfCards = [];

  for (const suit in Deck.cardSuites)  {
    for (const type in Deck.cardTypes) {
      arr.push(suit+type);
    }
  }
  
  return arr;
}

export const shuffleDeck = (deck: DeckOfCards):DeckOfCards => {
  let numOfCards: number = 32;
  let shuffledDeck: DeckOfCards = [];
  for (numOfCards; numOfCards >= 1; numOfCards--) {
    let rndInt = Math.floor(Math.random() * (numOfCards - 0 + 1) + 0)
    if (deck.length === rndInt) {
      rndInt--;
    }
    shuffledDeck.push(deck[rndInt]);

    deck.splice(rndInt, 1)
  }
  return shuffledDeck
}

export const game = () => {

}



