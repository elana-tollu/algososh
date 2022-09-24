import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './queue-page.module.css';

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

export function isDefined<Item> (item?: Item): boolean {
    return !!item;
}

export function findLastIndex<Item> (items: Item[], predicate: (item: Item) => boolean): number {
    let arr = [...items];
    arr.reverse();
    const index = arr.findIndex(predicate);
    if (index === -1) {
        return -1;
    }
    return arr.length - 1 - index;
}
