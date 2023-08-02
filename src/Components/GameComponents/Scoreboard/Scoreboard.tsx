import React from 'react';
import { PlayerScore, ScoreboardProps } from '../../../types';
import styles from './scoreboard.module.scss';
interface Props {
  scores?: PlayerScore[];
}
const Scoreboard: React.FC<Props> = ({ scores }) => {
  return (
    <div className={styles.scoreboard}>
      <h2>Scoreboard</h2>
      <ul>
        {scores?.map((playerScore: PlayerScore) => (
          <li key={playerScore.id}>
            {playerScore.id}: {playerScore.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
