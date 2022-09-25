import React from 'react';
import { Circle } from '../ui/circle/circle';
import styles from './fibonacci-page.module.css';

interface IFibonacciVisualProps { 
    readonly items: number[];
  }

export const FibonacciVisual: React.FC<IFibonacciVisualProps> = (props) => {
    const listOfCircles = props.items
      .map((item, index) => 
      <Circle letter={'' + item} index={index} key={index}/>
      );
    return (
        <div className={styles.visual}>
            {listOfCircles}
        </div>
    )
};


