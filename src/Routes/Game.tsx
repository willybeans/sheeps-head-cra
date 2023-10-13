import { useEffect, useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../Components/ColorModeSwitcher';
import useWebSocket from '../Components/Hooks/useWebSocket';
import GameBoard from '../Components/GameComponents/GameBoard/GameBoard';
import ChatContainer from '../Components/ChatComponents/ChatContainer/ChatContainer';

export const Game = () => {
  const [isReady, receivedMessages, gameState, send] = useWebSocket(
    'ws://localhost:8080/games/310d5995-7611-4888-9eb3-ecffc633c8e5'
  );
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (isReady) {
    }
  }, [isReady, send]);

  useEffect(() => {
    //write UUID logic here
    const storedId = localStorage.getItem('userId');
    if (storedId !== null) {
      setUserId(storedId);
    } else {
      localStorage.setItem('userId', 'd2792a62-86a4-4c49-a909-b1e762c683a3');
      setUserId('d2792a62-86a4-4c49-a909-b1e762c683a3');
    }
  }, []);

  return (
    <Box>
      <Box textAlign="center" fontSize="xl">
        {/* needs to go in a header */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}

        <Grid
          templateAreas={`"header header"
                  "game chat"
                  "game chat"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'72% 28%'}
          h="100vh"
          w="100%"
          padding={'5px'}
        >
          <GridItem pl="2" area={'header'}>
            header
          </GridItem>
          <GridItem pl="2" area={'game'}>
            <GameBoard userId={userId} send={send} gameState={gameState} />
          </GridItem>
          <GridItem pl="2" area={'chat'}>
            <ChatContainer
              userId={userId}
              send={send}
              chatFeed={receivedMessages}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
