import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './queue-page.module.css';
import { findLastIndex, isDefined } from './utils';

interface IQueueVisualProps { 
    readonly items: (string|undefined)[];
    readonly changing?: number;
  }

export const QueueVisual: React.FC<IQueueVisualProps> = (props) => {
    const headIndex = props.items.findIndex(isDefined);
    const tailIndex = findLastIndex(props.items, isDefined);
    const listOfCircles = props.items
    .map((item, index) => {
        const head = index === headIndex ? 'head' : null;  
        const tail = index === tailIndex ? 'tail' : null;
        const state = index === props.changing ? ElementStates.Changing : ElementStates.Default; 
        return (<Circle letter={item} state={state} key={index} index={index} head={head} tail={tail}/>)
    });
    return (
        <div className={styles.visual}>
            {listOfCircles}
        </div>
    )
};

