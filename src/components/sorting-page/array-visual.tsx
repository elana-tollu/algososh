import React from 'react';
import { Column } from '../ui/column/column';
import styles from './sorting-page.module.css';
import { IArrayItem } from './utils';


interface IArrayVisualProps { 
    readonly items: IArrayItem[];
  }

export const ArrayVisual: React.FC<IArrayVisualProps> = (props) => {

    const listOfColumns = props.items
      .map((item, index) => 
      <Column index={item.value} state={item.state} key={`${item.value}-${index}`}/>
      );
    return (
        <div className={styles.visual}>
            {listOfColumns}
        </div>
    )
};