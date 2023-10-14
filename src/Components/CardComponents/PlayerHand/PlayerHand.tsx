import React from 'react';
import Card from '../Card/Card';
import { Flex } from '@chakra-ui/react';

export interface Props {
  hand: string[];
  hasCardToPlay: boolean;
  selectedCard: string;
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
}

const PlayerHand: React.FC<Props> = ({
  hand,
  hasCardToPlay,
  selectedCard,
  setSelectedCard
}) => {
  console.log('hascard test', hasCardToPlay);
  return (
    <Flex direction={'column'} justify={'flex-end'}>
      <Flex
        direction={'row'}
        justify={'center'}
        overflow={'scroll'}
        minHeight={'10rem'}
      >
        {hand.map((card, i) => {
          return (
            <Card
              key={`card-${i}`}
              hasCardToPlay={hasCardToPlay}
              isSelected={selectedCard === card ? true : false}
              setSelectedCard={setSelectedCard}
              isPlayerHand
              card={card}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PlayerHand;
