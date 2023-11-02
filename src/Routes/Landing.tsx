import { useState, useEffect } from 'react';
import {
  Heading,
  Text,
  Flex,
  IconButton,
  Icon,
  Input,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../Components/ColorModeSwitcher';
import { ModalComponent } from '../Components/ModalComponent';
import { FaPlusCircle, FaDoorOpen } from 'react-icons/fa';
import InputBox from '../Components/ChatComponents/InputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import { getEnv } from '../utils/helpers';

const removeSlug = (inputString: string) => {
  return inputString.split('-').join(' ');
};
const addSlug = (inputString: string) => {
  return inputString.split(' ').join('-');
};
type Game = {
  id: string;
  name: string;
  created_at: string;
};
export const Landing = () => {
  const [gameList, setGameList] = useState<Game[]>([] as Game[]);
  const [userInput, setUserInput] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const response = await fetch(`${getEnv}/getAllGames`);
      const gameList = await response.json();

      if (gameList) {
        const noSlugs = gameList.game.map(({ name, id, created_at }: Game) => {
          return {
            name: removeSlug(name),
            id,
            created_at
          };
        });
        setGameList([...noSlugs]);
      }
    })();
  }, []);

  const createGameAction = async () => {
    const slugCase = addSlug(userInput);
    const response = await fetch(`${getEnv}/addGame?name=${slugCase}`);
    const newGame = await response.json();
    if (newGame) {
      newGame.name = removeSlug(newGame.name);
      setGameList(prev => [...prev, newGame]);
    }
    setUserInput('');
  };

  const joinGame = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };
  return (
    <Flex
      direction={'column'}
      justify={'center'}
      alignItems={'center'}
      width={'100%'}
    >
      <Flex width="100%">
        <ColorModeSwitcher justifySelf="flex-start" />
      </Flex>
      <Heading marginBottom={'1rem'} size={'md'}>
        Welcome to Sheepshead!
      </Heading>
      <Heading marginBottom={'2rem'} size={'md'}>
        A popular Wisconsin Card game.
      </Heading>
      <ModalComponent
        icon={FaPlusCircle}
        title={'Create New Game'}
        body={
          <Flex>
            Please input a game name
            <Input
              onChange={e => setUserInput(e.target.value)}
              placeholder="game name here"
              size="md"
            />
          </Flex>
        }
        primaryAction={createGameAction}
        primaryActionTitle={'Create New Game'}
        secondaryActionTitle={'cancel'}
      />

      <Text margin="2rem">OR</Text>

      <Heading size={'md'}>Select a game</Heading>

      {gameList ? (
        <Flex
          width={'100%'}
          direction={'row'}
          justify={'space-between'}
          flexWrap={'wrap'}
        >
          {gameList.map((game, i) => {
            return (
              <Button
                key={`game-${i}`}
                height={'5rem'}
                width={'30%'}
                margin={'2rem'}
                colorScheme="gray"
                onClick={() => joinGame(game.id)}
              >
                <Flex
                  height={'100%'}
                  padding={'.5rem'}
                  direction={'column'}
                  justify={'space-between'}
                  alignItems={'center'}
                >
                  <Heading size={'sm'}>{game.name}</Heading>
                  <Icon
                    data-testid="join-game-test"
                    aria-label="join game"
                    as={FaDoorOpen}
                    boxSize={10}
                    color="purple.500"
                    // onClick={onSubmit}
                  />
                </Flex>
              </Button>
            );
          })}
        </Flex>
      ) : (
        <Flex>there are no games currently</Flex>
      )}
    </Flex>
  );
};
