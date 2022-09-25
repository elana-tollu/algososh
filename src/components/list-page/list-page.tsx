import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './list-page.module.css';
import { ILinkedListState, ListVisual } from "./list-visual";



export const ListPage: React.FC = () => {
  const [list, setList] = useState<List<string>>(newLinkedList);
  const [listState, setListState] = useState<ILinkedListState<string>>(list.getResult());
  const [valueInput, setValueInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<string>('');

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setValueInput(changeEvent.target.value);
  }
  const handleIndexChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setIndexInput(changeEvent.target.value);
  }

  const doNext = () => {
    setTimeout(() => {
      setListState(list.getResult());
      if (list.isDone()) {
        setValueInput('');
        setIndexInput('');
        return;
      }
      list.next();
      doNext();
    }, 500);
  }

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    list.add(valueInput, parseInt(indexInput));
    doNext();
  }

  const handleAddToHead: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    list.add(valueInput, 0);
    doNext();
  }

  const handleAddToTail: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    list.addToTail(valueInput);
    doNext();
  }

  return (
    <SolutionLayout title="Связный список">

      <div className={styles.settings}>
        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите значение"}
                isLimitText={true}
                maxLength={4}
                value={valueInput}
                onChange={handleValueChange}
              />
          </div>
          <Button 
            text={"Добавить в head"}
            disabled={!valueInput}
            linkedList={"small"}
            onClick={handleAddToHead}
          />
          <Button 
            text={"Добавить в tail"}
            disabled={!valueInput}
            linkedList={"small"}
            onClick={handleAddToTail}
          />
          <Button 
            text={"Удалить из head"}
            disabled={true}
            linkedList={"small"}
          />
          <Button 
            text={"Удалить из tail"}
            disabled={true}
            linkedList={"small"}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите индекс"}
                type="number"
                value={indexInput}
                onChange={handleIndexChange}
              />
          </div>
          <Button 
            text={"Добавить по индексу"}
            disabled={!valueInput || !indexInput}
            linkedList={"big"}
            onClick={handleAdd}
          />
          <Button 
            text={"Удалить по индексу"}
            disabled={true}
            linkedList={"big"}
          />
        </div>
          
      </div>

      <ListVisual listState={listState} />

      {/* <div className={styles.visual}>
        <ArrowIcon 
          fill={"#0032FF"}
        />
      </div> */}

    </SolutionLayout>
  );
};

class List<Item> {
  items: Item[];
  adding?: {
    value: Item;
    destination: number;
    currentPosition: number;
    isInPlace: boolean;
  };

  constructor(items: Item[]) {
    this.items = items; 
  }

  add(value: Item, index: number): void {
    this.adding = {
      value,
      destination: index,
      currentPosition: 0,
      isInPlace: false
    }
  }

  addToTail(value: Item): void {
    this.adding = {
      value,
      destination: this.items.length,
      currentPosition: this.items.length - 1,
      isInPlace: false
    }
  }

  next(): void {
    if (this.adding) {
      if ((this.adding.currentPosition < this.adding.destination) && (this.adding.currentPosition === this.items.length - 1)) {
        this.items.push(this.adding.value);
        this.adding.isInPlace = true;
      }
      else if (this.adding.currentPosition < this.adding.destination) {
        this.adding.currentPosition++;
      } 
      else if (this.adding.currentPosition == this.adding.destination && !this.adding.isInPlace) {
        this.items.splice(this.adding.destination, 0, this.adding.value)
        this.adding.isInPlace = true;
      }
      else if (this.adding.isInPlace) {
        this.adding = undefined
      }
    }
  }

  isDone(): boolean {
    return !this.adding;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getResult(): ILinkedListState<Item> {
    let items = [...this.items].map(item => ({ 
      item,
      state: ElementStates.Default
    }));
    let adding;
    if (this.adding) {
      if (this.adding.isInPlace) {
        items[this.adding.destination].state = ElementStates.Modified;
      } 
      else {
        adding = {
          item: this.adding.value,
          index: this.adding.currentPosition
        }
      }
    };

    return {
      items,
      adding
    };
  }
} 

const newLinkedList: List<string> = new List(['0', '34', '8', '1']);