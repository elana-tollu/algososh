import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './queue-page.module.css';

export interface IQueueItem {
    letter: string,
    state: ElementStates,
    index: number,
    head?: string | React.ReactElement | null,
    tail?: string | React.ReactElement | null;
}

interface IQueueVisualProps { 
    readonly items: IQueueItem[];
  }

export const StringVisual: React.FC<IQueueVisualProps> = (props) => {
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