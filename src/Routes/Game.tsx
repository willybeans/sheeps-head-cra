import { useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../Components/ColorModeSwitcher';
import useWebSocket from '../Components/Hooks/useWebSocket';
import GameBoard from '../Components/GameComponents/GameBoard/GameBoard';
import ChatContainer from '../Components/ChatComponents/ChatContainer/ChatContainer';

export const Game = () => {
  const [isReady, receivedMessages, val, send] = useWebSocket(
    'ws://localhost:8080/games/310d5995-7611-4888-9eb3-ecffc633c8e5'
  );

  useEffect(() => {
    if (isReady) {
      // send('websocket send!');
      // write message format thing
    }
  }, [isReady, send]);

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
            <GameBoard />
          </GridItem>
          <GridItem pl="2" area={'chat'}>
            <ChatContainer send={send} chatFeed={receivedMessages} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
