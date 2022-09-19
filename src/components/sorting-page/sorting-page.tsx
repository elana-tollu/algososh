import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrayVisual, IArrayItem } from "./array-visual";
import styles from './sorting-page.module.css';

enum Algorithm {
  BubbleSort,
  SelectionSort
}

enum SortOrder {
  Asc,
  Desc
}

function createSorter(items: number[], algorithm: Algorithm, sortOrder: SortOrder): ISorter {
  const order: Order = sortOrder === SortOrder.Asc ? (a, b) => a > b : (a, b) => a < b;
  return algorithm === Algorithm.SelectionSort ? new SelectionSorter(items, order) : new BubbleSorter(items, order);
}

export const SortingPage: React.FC = () => {
  const [sorter, setSorter] = useState<ISorter|undefined>();
  const [run, setRun] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>(randomArr());
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.SelectionSort);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [_, setTicks] = useState<number>(0);

  const handleNew: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setArr(randomArr());
    setSorter(undefined);
  }

  const handleAsc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSortOrder(SortOrder.Asc);
    setSorter(createSorter(arr, algorithm, SortOrder.Asc));
    setRun(true);
  }

  const handleDesc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSortOrder(SortOrder.Desc);
    setSorter(createSorter(arr, algorithm, SortOrder.Desc));
    setRun(true);
  }

  const selectBubbleSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.BubbleSort);
  }

  const selectSelectionSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.SelectionSort);
  }

  useEffect(() => {
    if (run && sorter !== undefined && !sorter.isDone()) {
      setTimeout(() => {
        sorter!.next();
        setTicks(ticks => ticks + 1);
      }, 500); 
    } else {
      setRun(false);
    }
  });

  const items = sorter !== undefined ? sorter.getResult() : arr.map(value => {
    let state = ElementStates.Default;
    return {value, state}
  });

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.settings}>
        <div>
          <RadioInput 
            label={"Выбор"}
            checked={algorithm === Algorithm.SelectionSort}
            onChange={selectSelectionSort}
          />
          <RadioInput 
            label={"Пузырёк"}
            checked={algorithm === Algorithm.BubbleSort}
            onChange={selectBubbleSort}
          />
        </div>
        <div className={styles.buttons}>
          <Button 
            onClick={handleAsc}
            sorting={Direction.Ascending}
            text={"По возрастанию"}
            linkedList='medium'
            isLoader={run && sortOrder === SortOrder.Asc}
            disabled={run}
          />
          <Button 
            onClick={handleDesc}
            sorting={Direction.Descending}
            text={"По убыванию"}
            linkedList='medium'
            isLoader={run && sortOrder === SortOrder.Desc}
            disabled={run}
          />
          <Button 
            onClick={handleNew}
            style={{marginLeft:"68px"}}
            text={"Новый массив"}
            linkedList='medium'
            disabled={run}
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

class SelectionSorter implements ISorter {
  left: number;
  right: number;
  items: number[];
  order: Order;
  min: number;

  constructor(items: number[], order: Order) {
    this.items = items;
    this.left = -1;
    this.right = -1;
    this.order = order;
    this.min = -1;
  }

  getResult() {
    return this.items.map((value, index) => {
      let state = ElementStates.Default;
      if (index < this.left) {
        state = ElementStates.Modified;
      } 
      if (index === this.left || index === this.right) {
        state = ElementStates.Changing;
      }
      return {value, state}
    });
  }

  isDone(): boolean {
    return this.left >= this.items.length;
  }  

  next() {
    if (this.right >= this.items.length - 1){
      if (this.left < this.min) {
        swap(this.items, this.left, this.min);
      }
      this.left++;
      this.right = this.left;
      this.min = this.left;
      return;
    }

    if (this.left === -1) {
      this.left = 0;
      this.right = 0;
      this.min = 0;
    } else if (this.right < this.items.length - 1) {
      this.right++;
    } 
    this.min = this.order(this.items[this.right], this.items[this.min]) ? this.min :  this.right;
  }
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