import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import styles from './stack-page.module.css';

interface IStackVisualProps { 
    readonly items: string[];
    readonly changing: boolean;
  }

export const StackVisual: React.FC<IStackVisualProps> = (props) => {
    const listOfCircles = props.items
    .map((item, index, arr) => {
        const isLastItem = index === arr.length - 1;
        const head = isLastItem ? 'top' : null;
        const state = (isLastItem && props.changing) ? ElementStates.Changing : ElementStates.Default;
        return (<Circle letter={item} state={state} key={`${item}-${index}`} index={index} head={head} />)
    });
    return (
        <div className={styles.visual}>
            {listOfCircles}
        </div>
    )
};