import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../../CardComponents/PlayerHand/PlayerHand';
import styles from './userseat.module.scss';
import Card from '../../CardComponents/Card/Card';
import { Player } from '../../../types';
import Sheep from '../../../svgs/sheep/Eid-Sheep.svg';

const UserSeat: React.FC<Player> = player => {
  return (
    <div className={styles.userSeat}>
      <div>{player.id}</div>
      <img src={Sheep} alt="Sheep" />
      <div className={styles.cards}>
        {player?.hand?.map((c, i) => {
          return (
            <div key={`seat-${i}`} className={styles.cardWrapper}>
              <Card key={`${c}-${i}`} card="BACK" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSeat;
