import React from 'react';
import { Circle } from '../ui/circle/circle';
import styles from './string.module.css';
import { IStringItem } from './utils';


interface IStringVisualProps { 
    readonly items: IStringItem[];
  }

export const StringVisual: React.FC<IStringVisualProps> = (props) => {
    const listOfCircles = props.items
      .map((item, index) => 
      <Circle letter={item.letter} state={item.state} key={index}/>
      );
    return (
        <div className={styles.visual}>
            {listOfCircles}
        </div>
    )
};