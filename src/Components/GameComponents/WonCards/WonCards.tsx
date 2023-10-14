import React from 'react';
import { PlayerScore, ScoreboardProps } from '../../../types';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Card from '../../CardComponents/Card/Card';
interface Props {
  cards?: string[];
}
const WonCards: React.FC<Props> = ({ cards }) => {
  return (
    <Flex direction={'row'} height={'4rem'} justify={'space-between'}>
      <Heading as="h6" size="4xs">
        Won Cards:
      </Heading>
      <Flex direction="row" width={'50%'}>
        {cards?.map((c, i) => {
          return <Card key={`${c}-${i}`} card="BACK" />;
        })}
      </Flex>
    </Flex>
  );
};

export default WonCards;
