import React from 'react';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';
import styles from './sorting-page.module.css';

export interface IArrayItem {
    value: number,
    state: ElementStates
}

interface IArrayVisualProps { 
    readonly items: IArrayItem[];
  }

export const ArrayVisual: React.FC<IArrayVisualProps> = (props) => {

    const listOfColumns = props.items
      .map((item, index) => 
      <Column index={item.value} state={item.state} key={index}/>
      );
    return (
        <div className={styles.visual}>
            {listOfColumns}
        </div>
    )
};