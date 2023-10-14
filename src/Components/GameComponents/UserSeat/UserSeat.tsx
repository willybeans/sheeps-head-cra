import React, { useState, useEffect, SetStateAction } from 'react';
import Card from '../../CardComponents/Card/Card';
import { Player } from '../../../types';
import Sheep from '../../../svgs/sheep/Eid-Sheep.svg';
import { Box, Flex, Image, Heading } from '@chakra-ui/react';
import WonCards from '../WonCards/WonCards';

const UserSeat: React.FC<Player> = player => {
  //temp
  const tempName = player.id.split('-');
  return (
    <Flex direction={'column'} justify={'flex-start'} align={'center'}>
      <Heading as="h6" size="4xs">
        {tempName[1]}
      </Heading>
      <Image boxSize={'5rem'} src={Sheep} alt="Sheep" />
      <Box>Score: {player.score}</Box>
      <WonCards cards={player?.wonCards} />
      <Flex direction={'row'} paddingLeft={'1rem'}>
        {player?.hand?.map((c, i) => {
          return <Card key={`${c}-${i}`} card="BACK" />;
        })}
      </Flex>
      <Box height={'7rem'}>
        {player?.cardToPlay?.card && <Card card={player?.cardToPlay?.card} />}
      </Box>
    </Flex>
  );
};

export default UserSeat;
