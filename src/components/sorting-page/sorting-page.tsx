import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrayVisual, IArrayItem } from "./array-visual";
import styles from './sorting-page.module.css';

enum Algorithm {
  BubbleSort,
  SelectionSort
}

export const SortingPage: React.FC = () => {
  const [sorter, setSorter] = useState<ISorter>(new BubbleSorter(randomArr(), (a, b) => a > b));
  const [items, setItems] = useState<IArrayItem[]>([]);
  const [run, setRun] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.SelectionSort);

  const handleNew: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    const newArray = randomArr();
    const newItems = newArray.map(value => {
      let state = ElementStates.Default;
      return {value, state}
    });
    setItems(newItems);
    setArr(newArray);
  }

  const handleAsc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSorter(new BubbleSorter(arr, (a, b) => a > b));
    setRun(true);
  }

  const handleDesc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSorter(new BubbleSorter(arr, (a, b) => a < b));
    setRun(true);
  }

  const selectBubbleSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.BubbleSort);
  }

  const selectSelectionSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.SelectionSort);
  }

  useEffect(() => {
    if (run && !sorter.isDone()) {
      setTimeout(() => {
        sorter.next();
        setItems(sorter.getResult());
      }, 500); 
    } else {
      setRun(false);
    }
  });

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.settings}>
        <div>
          <RadioInput 
            label={"Выбор"}
            checked={algorithm == Algorithm.SelectionSort}
            onChange={selectSelectionSort}
          />
          <RadioInput 
            label={"Пузырёк"}
            checked={algorithm == Algorithm.BubbleSort}
            onChange={selectBubbleSort}
          />
        </div>
        <div className={styles.buttons}>
          <Button 
            onClick={handleAsc}
            sorting={Direction.Ascending}
            text={"По возрастанию"}
            linkedList='medium'
            isLoader={run==true}
          />
          <Button 
            onClick={handleDesc}
            sorting={Direction.Descending}
            text={"По убыванию"}
            linkedList='medium'
            isLoader={run==true}
          />
          <Button 
            onClick={handleNew}
            style={{marginLeft:"68px"}}
            text={"Новый массив"}
            linkedList='medium'
          />
        </div>
      </div>

      <div className={styles.visual}>
         <ArrayVisual items={items} />
      </div>

    </SolutionLayout>
  );
};

function randomArr() {
  const n = randomInt(3, 17);
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(randomInt(0, 100));
  }
  return arr;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Order = (a: number, b: number) => boolean;

interface ISorter {
  getResult: () => IArrayItem[];
  isDone: () => boolean;
  next: () => void;
}

class BubbleSorter implements ISorter {
  sortEnd: number;
  bubble: number;
  items: number[];
  order: Order;


  constructor(items: number[], order: Order) {
    this.items = items;
    this.sortEnd = items.length;
    this.bubble = -1;
    this.order = order;
  }

  getResult() {
    return this.items.map((value, index) => {
      let state = ElementStates.Default;
      if (index >= this.sortEnd) {
        state = ElementStates.Modified;
      } else if (this.bubble != null && (index === this.bubble || index === this.bubble + 1)) {
        state = ElementStates.Changing;
      }
      return {value, state}
    });
  }

  isDone(): boolean {
    return this.sortEnd === 0;
  }

  next() {
    if (this.bubble < 0) {
      this.bubble = 0;
    } 
    const bubble = this.bubble;
    if (bubble + 1 >= this.sortEnd) {
      this.sortEnd = 0;
      return;
    }

    if (this.order(this.items[bubble], this.items[bubble + 1])) {
      swap(this.items, bubble, bubble + 1);
    }

    if (bubble + 2 >= this.sortEnd) {
      this.sortEnd--;
      this.bubble = 0;
    } else {
      this.bubble++;
    }
  }
}

function swap(items: number[], i: number, j: number) {
  const v = items[i];
  items[i] = items[j];
  items[j] = v;
}