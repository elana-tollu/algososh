import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './fibonacci-page.module.css';

interface IFibonacciVisualProps { 
    readonly items: number[];
  }

export const FibonacciVisual: React.FC<IFibonacciVisualProps> = (props) => {
    const listOfCircles = props.items
      .map((item, index) => 
      <Circle letter={'' + item} index={index}/>
      );
    return (
        <div className={styles.visual}>
            {listOfCircles}
        </div>
    )
};


