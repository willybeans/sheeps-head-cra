import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../../CardComponents/PlayerHand/PlayerHand';
import { GameInstance, WebSocketSend } from '../../../types';
import UserSeat from '../UserSeat/UserSeat';
import { Button, Flex } from '@chakra-ui/react';

const GameBoard: React.FC<{
  send: WebSocketSend | undefined;
  gameState: GameInstance;
  userId?: string;
}> = ({ send, gameState, userId }) => {
  const [isSeated, setIsSeated] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>('');

  useEffect(() => {
    // if (isSeated) {
    //   gameState?.players?.forEach(p => {
    //     if (p.id === userId) setIsSeated(!isSeated);
    //   });
    // }
  }, [gameState]);

  const cardAction = () => {
    let stringified = '';
    try {
      stringified = JSON.stringify({
        userId,
        gameCommand: {
          userPlaysCard: selectedCard
        },
        contentType: 'game'
      });
      if (send) send(stringified);
    } catch (e) {
      console.error('failed at seatActions', e);
    }
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
      setIsSeated(!isSeated);
    } catch (e) {
      console.error('failed at seatActions', e);
    }
  };

  return (
    <Flex direction={'column'}>
      <Flex direction={'row'} justify={'space-between'}>
        <Button
          size="md"
          colorScheme={'blue'}
          visibility={!isSeated ? 'hidden' : 'visible'}
          isDisabled={selectedCard === '' ? true : false}
          onClick={cardAction}
        >
          Play Card
        </Button>
        <Button
          colorScheme={!isSeated ? 'purple' : 'pink'}
          size="md"
          onClick={seatAction}
        >
          {!isSeated ? 'Take a Seat' : 'Leave Your Seat'}
        </Button>
      </Flex>
      <Flex direction={'row'} justify={'space-around'}>
        {gameState?.players?.map((player, i) => {
          return <UserSeat key={`${player.id}`} {...player} />;
        })}
      </Flex>

      {gameState?.players?.map((p, i) => {
        if (p.id === userId) {
          return (
            <PlayerHand
              hasCardToPlay={
                p.cardToPlay.card === '' || p.cardToPlay.card === undefined
                  ? false
                  : true
              }
              key={'yourhand ' + i}
              hand={p.hand}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          );
        }
      })}
    </Flex>
  );
};

export default GameBoard;
