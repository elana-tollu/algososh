import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import styles from './list-page.module.css';
import { ILinkedListState, listState } from './utils';



interface IListVisualProps { 
    listState: ILinkedListState<string>
}


export const ListVisual: React.FC<IListVisualProps> = (props) => {
    const listOfCircles = props.listState.items
    .map((item, index) => {
        let head;  
        if (index === 0) {
            head = 'head';
        } 
        if (props.listState.adding?.index === index) {
            head = <Circle isSmall letter={props.listState.adding.item} state={ElementStates.Changing}/>
        }
        let tail;
        if (index === props.listState.items.length - 1) {
            tail = 'tail';
        } 
        if (props.listState.removing?.index === index) {
            tail = <Circle isSmall letter={props.listState.removing.item} state={ElementStates.Changing}/>
        }
        return (<Circle letter={item.item} state={item.state} key={`${item.item}-${index}-circle`} index={index} head={head} tail={tail}/>)
    });
    const circlesCount = listOfCircles.length;
    for (let i = 1; i < circlesCount * 2 - 1; i = i + 2) {
        listOfCircles.splice(i, 0, (<ArrowIcon key={i + '-arrow'} fill="#0032FF"/>));
    }
    return (
        <div className={styles.visual} data-cy-state={listState(props.listState)} data-test-id="list">
            {listOfCircles}
        </div>
    )
};