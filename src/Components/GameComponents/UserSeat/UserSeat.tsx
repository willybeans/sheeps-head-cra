import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../../CardComponents/PlayerHand/PlayerHand';
import styles from './userseat.module.scss';
import Card from '../../CardComponents/Card/Card';
import { Player } from '../../../types';
import Sheep from '../../../svgs/sheep/Eid-Sheep.svg';
import { Box, Flex, Image } from '@chakra-ui/react';

const UserSeat: React.FC<Player> = player => {
  //temp
  const tempName = player.id.split('-');
  return (
    <Flex direction={'column'} justify={'flex-start'} align={'center'}>
      <div>{tempName[1]}</div>
      <Image boxSize={'5rem'} src={Sheep} alt="Sheep" />
      <Flex direction={'row'} paddingLeft={'1rem'}>
        {player?.hand?.map((c, i) => {
          return <Card key={`${c}-${i}`} card="BACK" />;
        })}
      </Flex>
      {player?.cardToPlay?.card && <Card card={player?.cardToPlay?.card} />}
    </Flex>
  );
};

export default UserSeat;
