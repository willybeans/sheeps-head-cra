import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../../CardComponents/PlayerHand/PlayerHand';
import { GameInstance, WebSocketSend } from '../../../types';
import UserSeat from '../UserSeat/UserSeat';
import { Button, Flex, Box, Heading } from '@chakra-ui/react';
import { getPlayerIndex } from '../../../utils/helpers';

const GameBoard: React.FC<{
  send: WebSocketSend | undefined;
  gameState: GameInstance;
  userId?: string;
}> = ({ send, gameState, userId }) => {
  const [isSeated, setIsSeated] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>('');

  useEffect(() => {
    if (!isSeated) {
      gameState?.players?.forEach(p => {
        if (p.id === userId) setIsSeated(true);
      });
    }
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

  const startGameAction = () => {
    if (gameState?.players && gameState.players.length >= 3) {
      let stringified = '';
      try {
        stringified = JSON.stringify({
          userId,
          gameCommand: 'gameStart',
          contentType: 'game'
        });
        if (send) send(stringified);
      } catch (e) {
        console.error('failed at seatActions', e);
      }
    }
  };

  const blindCardAction = (command: string) => {
    let stringified = '';
    try {
      stringified = JSON.stringify({
        userId,
        gameCommand:
          command === 'take' ? 'setPickerAndTeams' : 'passBlindToNext',
        contentType: 'game'
      });
      if (send) send(stringified);
      setIsSeated(!isSeated);
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

        {/* {is it your turn? 
if yes: say something about either the blind, or playing a card 
if it isnt your turn, say something about waiting for your turn

if you arent seated, just say whos turn it is, period

} */}
        {isSeated &&
          gameState.inProgress &&
          gameState?.blindCards?.length > 0 && (
            <Flex width={'100%'} justify={'flex-end'}>
              {getPlayerIndex(gameState?.players, userId) ===
              gameState.currentPlayer ? (
                <Box>
                  <Button
                    size="md"
                    marginRight={'0.5rem'}
                    colorScheme={'green'}
                    onClick={() => blindCardAction('take')}
                  >
                    Take Blind Cards
                  </Button>
                  <Button
                    size="md"
                    colorScheme={'red'}
                    onClick={() => blindCardAction('pass')}
                  >
                    Pass to next player
                  </Button>
                </Box>
              ) : (
                <Heading
                  as="h5"
                  size="md"
                  color={'tomato'}
                  display={'flex'}
                  textAlign={'center'}
                >
                  {gameState?.blindCards?.length > 0 && 'Waiting on blind'}
                </Heading>
              )}
            </Flex>
          )}

        {isSeated &&
          gameState.inProgress &&
          gameState?.blindCards?.length === 0 && (
            <Flex justify={'flex-start'}>
              <Heading
                as="h5"
                size="md"
                color={'tomato'}
                display={'flex'}
                textAlign={'center'}
              >
                {getPlayerIndex(gameState?.players, userId) ===
                gameState.currentPlayer
                  ? 'please play a card'
                  : `waiting on ${
                      gameState.players &&
                      gameState?.players[gameState?.currentPlayer].userName
                    }`}
              </Heading>
            </Flex>
          )}

        {isSeated && !gameState.inProgress && (
          <Button size="md" colorScheme={'green'} onClick={startGameAction}>
            Start Game!
          </Button>
        )}

        {!isSeated && gameState.inProgress && (
          <Heading>
            {`currently ${
              gameState.players &&
              gameState?.players[gameState?.currentPlayer].userName
            }'s turn`}
          </Heading>
        )}

        {!isSeated && !gameState.inProgress && (
          <Button
            colorScheme={!isSeated ? 'purple' : 'pink'}
            size="md"
            onClick={seatAction}
          >
            {!isSeated ? 'Take a Seat' : 'Leave Your Seat'}
          </Button>
        )}
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
