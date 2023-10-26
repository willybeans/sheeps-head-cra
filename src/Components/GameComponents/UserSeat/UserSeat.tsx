import React, { useState, useEffect, SetStateAction } from 'react';
import Card from '../../CardComponents/Card/Card';
import { Player } from '../../../types';
import Sheep from '../../../svgs/sheep/Eid-Sheep.svg';
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';
import WonCards from '../WonCards/WonCards';

type Props = {
  player: Player;
  isSecretTeam: boolean;
  isVisible: boolean;
};

const UserSeat: React.FC<Props> = ({ player, isSecretTeam, isVisible }) => {
  return (
    <Flex direction={'column'} justify={'flex-start'} align={'center'}>
      <Heading as="h6" size="4xs">
        {player.userName}
      </Heading>
      <Image boxSize={'5rem'} src={Sheep} alt="Sheep" />
      <Flex direction={'column'} minHeight={'4rem'}>
        <Box>Score: {player.score}</Box>
        {isSecretTeam && isVisible && (
          <Text color={'tomato'}>On Secret Team</Text>
        )}
      </Flex>

      <WonCards cards={player?.wonCards} />
      <Heading as="h6" size="4xs">
        Hand
      </Heading>
      <Flex direction={'row'} paddingLeft={'1rem'}>
        {player?.hand?.map((c, i) => {
          return <Card key={`${c}-${i}`} card="BACK" />;
        })}
      </Flex>
      <Box marginTop={'0.5rem'} height={'7rem'}>
        {player?.cardToPlay?.card && <Card card={player?.cardToPlay?.card} />}
      </Box>
    </Flex>
  );
};

export default UserSeat;
