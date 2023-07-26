import React from 'react';
import Card from '../Card/Card';
import { Flex } from '@chakra-ui/react';
import styles from './PlayerHand.module.scss';

import { PlayerHandProps } from '../../../types';

const PlayerHand: React.FC<PlayerHandProps> = ({ hand, playCard }) => {
  return (
    <Flex className={styles.playersHand}>
      {hand.map(card => (
        <Card key={card} card={card} cardClick={playCard} />
      ))}
    </Flex>
  );
};

export default PlayerHand;
