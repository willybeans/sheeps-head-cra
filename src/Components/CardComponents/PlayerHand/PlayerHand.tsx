import React from 'react';
import Card from '../Card/Card';
import { Flex } from '@chakra-ui/react';
import styles from './PlayerHand.module.scss';

import { PlayerHandProps } from '../../../types';

const PlayerHand: React.FC<PlayerHandProps> = ({ hand, playCard }) => {
  return (
    <div className={styles.playersHand}>
      <h2>Your Hand</h2>
      <div className={styles.wrapper}>
        {hand.map((card, i) => {
          return <Card key={`card-${i}`} card={card} cardClick={playCard} />;
        })}
      </div>
    </div>
  );
};

export default PlayerHand;
