import {
  GamePlayer,
  Players,
  CardValues,
  CardSuites,
  TableCard,
  WinningCard,
  Player,
  PlayerScore
} from '../types';
import {
  cardSuites,
  cardTypes,
  cardComparativeValues,
  cardScoreValues
} from './deck';

export function getPlayerIndex(players: Players, playerId: string) {
  return players.map((p: GamePlayer) => p.id).indexOf(playerId);
}

export function convertCardToEnglish(card: string): string {
  const splitCard = card.split('');
  const value: string = cardTypes[splitCard[0]] as CardValues;
  const suit: string = cardSuites[splitCard[1]] as CardSuites;

  return `${value} ${suit} `;
}

export function calculateWinner(cards: TableCard[]): {
  id: string;
  cards: string[];
} {
  const cleanIds: string[] = [];
  let winningCard = {} as WinningCard;
  cards.forEach((x: TableCard) => {
    const value = x.card;
    const getCardValue = cardComparativeValues[value];
    if (
      getCardValue > winningCard?.gameValue ||
      winningCard?.gameValue === undefined
    ) {
      winningCard = {
        player: x.player,
        card: value,
        gameValue: getCardValue
      };
    }
    cleanIds.push(x.card);
  });
  return {
    id: winningCard.player,
    cards: cleanIds
  };
}

function getPlayersTotal(players: Player[]): Player[] {
  return players.map((player, index) => {
    let total = 0;
    player.wonCards.forEach((c: string) => {
      const split = c.split('');
      const cardType = split[0];
      total += cardScoreValues[cardType];
    });

    return { ...player, wonCardsTotal: total };
  });
}

export function calculateAllPlayersScores(
  players: Player[],
  gameMode: string
): PlayerScore[] {
  const playersWithTotal = getPlayersTotal(players);
  // if (gameMode === 'picker') {
  // picker and partner are scored together as secret team
  let secretTeamTotal = 0;
  let otherTeamTotal = 0;
  let pickerPoints = 2;
  let otherPoints = 1;

  const increaseValues = (val: number) => {
    pickerPoints *= val;
    otherPoints *= val;
  };

  playersWithTotal.forEach((p: Player) => {
    if (p.onSecretTeam) {
      secretTeamTotal += p.wonCardsTotal;
    } else {
      otherTeamTotal += p.wonCardsTotal;
    }
  });

  // if secretTeam has more than 61 - picker gets 2 points, partner gets 1
  // all other players lose 1 point

  //if less, picker loses 2 points, partner loses 1
  // is there a way to abstract the loop, and pass in values to mess with?

  //If the picking team wins and the other
  //team doesn't earn more than 30 card points,
  // double the points each player wins or loses in this round.

  if (secretTeamTotal > 61 && secretTeamTotal < 120) {
    if (otherTeamTotal < 30) {
      increaseValues(2);
    }
  } else if (secretTeamTotal === 120 || otherTeamTotal === 120) {
    increaseValues(3);
  } else {
    if (secretTeamTotal < 30) {
      increaseValues(2);
    }
  }

  // this will move to the reducer i believe
  return playersWithTotal.map((p: Player) => {
    if (p.onSecretTeam) {
      if (secretTeamTotal > 61) {
        p.isPicker ? (p.score += pickerPoints) : (p.score += otherPoints);
      } else if (otherTeamTotal === 120) {
        // edge case where partner doesnt get penalty
        p.isPicker ? (p.score -= pickerPoints) : (p.score -= 1);
      } else {
        p.isPicker ? (p.score -= pickerPoints) : (p.score -= otherPoints);
      }
    } else {
      otherTeamTotal > 61 ? (p.score += otherPoints) : (p.score -= otherPoints);
    }
    return {
      id: p.id,
      score: p.score
    };
  });
  //  playersWithTotal;
  // }
  // else if (game.setScoreMode === 'doubler') {
  // } else if (game.setScoreMode === 'leaster') {
  // }
}
