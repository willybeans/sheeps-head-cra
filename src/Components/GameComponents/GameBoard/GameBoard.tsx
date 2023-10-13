import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../../CardComponents/PlayerHand/PlayerHand';
import TrickPile from '../../CardComponents/TrickPile/TrickPile';
import Scoreboard from '../Scoreboard/Scoreboard';
import CurrentPlayer from '../CurrentPlayer';
import { GameInstance, WebSocketSend } from '../../../types';

import UserSeat from '../UserSeat/UserSeat';
import { Button, Flex } from '@chakra-ui/react';

const GameBoard: React.FC<{
  send: WebSocketSend | undefined;
  gameState: GameInstance;
  userId?: string;
}> = ({ send, gameState, userId }) => {
  const [isSeated, setIsSeated] = useState<boolean>(false);

  useEffect(() => {
    if (!isSeated) {
      console.log('if seated');
      gameState?.players?.forEach(p => {
        if (p.id === userId) setIsSeated(true);
      });
    }
  }, [gameState]);

  const playCard = (card: string) => {
    console.info('playCard <GameBoard>', card);
    // Logic to handle playing a card in the game
    // Update currentPlayer, trickCards, scores, etc.
  };

  const seatAction = () => {
    let stringified = '';
    try {
      stringified = JSON.stringify({
        userId,
        gameCommand: !isSeated ? 'setPlayer' : 'removePlayer',
        contentType: 'game'
      });
      if (send) send(stringified);
    } catch (e) {
      console.error('failed at seatActions', e);
    }
  };

  return (
    <Flex direction={'column'}>
      <Flex direction={'row'} justify={'flex-end'}>
        <Button
          colorScheme={!isSeated ? 'purple' : 'pink'}
          size="md"
          onClick={seatAction}
        >
          {!isSeated ? 'Take a Seat' : 'Leave Your Seat'}
        </Button>
      </Flex>
      {/* <Scoreboard scores={scores} /> */}
      <Flex direction={'row'} justify={'space-around'}>
        {gameState?.players?.map((player, i) => {
          return <UserSeat key={`${player.id}`} {...player} />;
        })}
      </Flex>

      <TrickPile cards={gameState.currentCardsOnTable} />
      {gameState?.players?.map((p, i) => {
        if (p.id === userId) {
          return (
            <PlayerHand
              key={'yourhand ' + i}
              hand={p.hand}
              playCard={playCard}
            />
          );
        }
      })}
    </Flex>
  );
};

export default GameBoard;
