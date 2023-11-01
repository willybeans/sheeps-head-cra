import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../Components/ColorModeSwitcher';
import useWebSocket from '../Components/Hooks/useWebSocket';
import GameBoard from '../Components/GameComponents/GameBoard/GameBoard';
import ChatContainer from '../Components/ChatComponents/ChatContainer/ChatContainer';
import { generate } from '../utils/nameGen';
import { User } from '../types';

export const Game = () => {
  const [isReady, receivedMessages, gameState, send] = useWebSocket(
    `ws://localhost:8080${document.location.pathname}`
  );
  const [user, setUser] = useState<User>(); // userId , setUserId

  useEffect(() => {
    if (isReady) {
    }
  }, [isReady, send]);

  useEffect(() => {
    // check uuid from DB
    // if doesnt exist make new and return
    // set that here
    // otherwise set it here
    const storedUser = localStorage.getItem('user');

    let userObj;
    if (storedUser !== '{}' && storedUser !== null) {
      try {
        userObj = JSON.parse(storedUser || '');
      } catch (e) {
        console.error(e);
      }
    }
    if (storedUser !== null && userObj !== undefined) {
      (async function () {
        const response = await fetch(
          `http://localhost:8080/getUser?id=${userObj?.user?.id}`
        );
        const dbUser = await response.json();
        if (dbUser) setUser({ ...dbUser.user });
      })();
    } else {
      // get user id /or/ make one and return,
      // either way you return an id
      // add random user name generator?
      (async function () {
        const newName = generate();
        const response = await fetch(
          `http://localhost:8080/addUser?user_name=${newName}`
        );

        const newUser = await response.json();

        let stringify = '';
        try {
          stringify = JSON.stringify({ ...newUser });
          localStorage.setItem('user', stringify);

          setUser({ ...newUser['user'] });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, []);

  return (
    <Box>
      <Box textAlign="center" fontSize="xl">
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
            <Flex direction={'row'} justify={'space-between'}>
              <ColorModeSwitcher />
              {user?.username}
            </Flex>
          </GridItem>
          <GridItem pl="2" area={'game'}>
            {isReady && user && (
              <GameBoard userId={user.id} send={send} gameState={gameState} />
            )}
          </GridItem>
          <GridItem pl="2" area={'chat'}>
            <ChatContainer
              userId={user?.id}
              userName={user?.username}
              send={send}
              chatFeed={receivedMessages}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
