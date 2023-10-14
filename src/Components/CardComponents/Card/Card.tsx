import { FC, Dispatch, SetStateAction } from 'react';
import { cardSuites, cardTypes } from '../../../GameLogic/deck';
import { convertCardToEnglish } from '../../../GameLogic/gameUtil';
import styles from './card.module.scss';
import { SvgMap } from '../../../utils/svgMap';

interface Props {
  card: string;
  hasCardToPlay?: boolean;
  isPlayerHand?: boolean;
  isSelected?: boolean;
  setSelectedCard?: Dispatch<SetStateAction<string>>;
}
const Card: FC<Props> = ({
  card,
  isPlayerHand,
  isSelected,
  setSelectedCard,
  hasCardToPlay
}) => {
  const splitCard = card?.split('');
  const suit: string = splitCard[0] ?? '';
  const value: string = splitCard[1] ?? '';

  const onClick = () => {
    if (!hasCardToPlay && isPlayerHand) {
      if (setSelectedCard) {
        isSelected ? setSelectedCard('') : setSelectedCard(card);
      }
    }
  };

  return (
    <div
      data-testid={'card-test'}
      className={`${isSelected ? styles.largeCard : styles.card} ${
        card === 'BACK' && styles.back
      }`}
      onClick={onClick}
      title={
        card === 'BACK'
          ? convertCardToEnglish(card)
          : `${cardTypes[suit]} of ${cardSuites[value]}`
      }
    >
      <img src={SvgMap(card)} />
    </div>
  );
};

export default Card;
