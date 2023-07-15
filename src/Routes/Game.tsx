import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../Components/ColorModeSwitcher';
// import {createDeck, shuffleDeck} from '../GameLogic/game'

export const Game = () => {
  // const [isPaused, setPause] = useState(false);
  const [contents, setContents] = useState();
  const ws = useRef(null) as MutableRefObject<null | WebSocket>;

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    const wsCurrent = ws.current;

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      setContents(message);
      console.log('ws message:', message);
    };

    return () => {
      wsCurrent.close();
    };
  }, []);

  // useEffect(() => {
  //     if (!ws.current) return;

  //     ws.current.onmessage = e => {
  //         if (isPaused) return;
  //         const message = JSON.parse(e.data);
  //         console.log("e", message);
  //     };
  // }, [isPaused]);
  return (
    <Box>
      test test test
      <Box textAlign="center" fontSize="xl">
        {/* needs to go in a header */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}

        <Grid
          templateAreas={`"header header"
                  "game chat"
                  "game chat"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'75% 1fr'}
          h="100vh"
          w="100%"
        >
          <GridItem pl="2" area={'header'}>
            header
          </GridItem>
          <GridItem pl="2" area={'game'}>
            Testing websockets here: {contents}
          </GridItem>
          <GridItem pl="2" area={'chat'}>
            test
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
