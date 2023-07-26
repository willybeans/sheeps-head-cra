import Astronaut from '../svgs/backs/astronaut.svg';
import SevenClubs from '../svgs/fronts/clubs_7.svg';
import EightClubs from '../svgs/fronts/clubs_8.svg';
import NineClubs from '../svgs/fronts/clubs_9.svg';
import TenClubs from '../svgs/fronts/clubs_10.svg';
import JackClubs from '../svgs/fronts/clubs_jack.svg';
import QueenClubs from '../svgs/fronts/clubs_queen.svg';
import KingClubs from '../svgs/fronts/clubs_king.svg';
import AceClubs from '../svgs/fronts/clubs_ace.svg';
import SevenSpades from '../svgs/fronts/spades_7.svg';
import EightSpades from '../svgs/fronts/spades_8.svg';
import NineSpades from '../svgs/fronts/spades_9.svg';
import TenSpades from '../svgs/fronts/spades_10.svg';
import JackSpades from '../svgs/fronts/spades_jack.svg';
import QueenSpades from '../svgs/fronts/spades_queen.svg';
import KingSpades from '../svgs/fronts/spades_king.svg';
import AceSpades from '../svgs/fronts/spades_ace.svg';
import SevenDiamonds from '../svgs/fronts/diamonds_7.svg';
import EightDiamonds from '../svgs/fronts/diamonds_8.svg';
import NineDiamonds from '../svgs/fronts/diamonds_9.svg';
import TenDiamonds from '../svgs/fronts/diamonds_10.svg';
import JackDiamonds from '../svgs/fronts/diamonds_jack.svg';
import QueenDiamonds from '../svgs/fronts/diamonds_queen.svg';
import KingDiamonds from '../svgs/fronts/diamonds_king.svg';
import AceDiamonds from '../svgs/fronts/diamonds_ace.svg';
import SevenHearts from '../svgs/fronts/hearts_7.svg';
import EightHearts from '../svgs/fronts/hearts_8.svg';
import NineHearts from '../svgs/fronts/hearts_9.svg';
import TenHearts from '../svgs/fronts/hearts_10.svg';
import JackHearts from '../svgs/fronts/hearts_jack.svg';
import QueenHearts from '../svgs/fronts/hearts_queen.svg';
import KingHearts from '../svgs/fronts/hearts_king.svg';
import AceHearts from '../svgs/fronts/hearts_ace.svg';

export const SvgMap = (card: string) => {
  switch (card) {
    case 'BACK':
      return Astronaut;
    case 'SC':
      return SevenClubs;
    case 'EC':
      return EightClubs;
    case 'NC':
      return NineClubs;
    case 'TC':
      return TenClubs;
    case 'JC':
      return JackClubs;
    case 'QC':
      return QueenClubs;
    case 'KC':
      return KingClubs;
    case 'AC':
      return AceClubs;
    case 'SS':
      return SevenSpades;
    case 'ES':
      return EightSpades;
    case 'NS':
      return NineSpades;
    case 'TS':
      return TenSpades;
    case 'JS':
      return JackSpades;
    case 'QS':
      return QueenSpades;
    case 'KS':
      return KingSpades;
    case 'AS':
      return AceSpades;
    case 'SD':
      return SevenDiamonds;
    case 'ED':
      return EightDiamonds;
    case 'ND':
      return NineDiamonds;
    case 'TD':
      return TenDiamonds;
    case 'JD':
      return JackDiamonds;
    case 'QD':
      return QueenDiamonds;
    case 'KD':
      return KingDiamonds;
    case 'AD':
      return AceDiamonds;
    case 'SH':
      return SevenHearts;
    case 'EH':
      return EightHearts;
    case 'NH':
      return NineHearts;
    case 'TH':
      return TenHearts;
    case 'JH':
      return JackHearts;
    case 'QH':
      return QueenHearts;
    case 'KH':
      return KingHearts;
    case 'AH':
      return AceHearts;
    default:
      break;
  }
};
