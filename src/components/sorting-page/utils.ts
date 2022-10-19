import { ElementStates } from "../../types/element-states";

export enum Algorithm {
  BubbleSort,
  SelectionSort,
}

export enum SortOrder {
  Asc,
  Desc,
}

type Order = (a: number, b: number) => boolean;

export interface ISorter {
  getResult: () => IArrayItem[];
  isDone: () => boolean;
  next: () => void;
}

export interface IArrayItem {
    value: number,
    state: ElementStates
}


export function createSorter(
  items: number[],
  algorithm: Algorithm,
  sortOrder: SortOrder
): ISorter {
  const order: Order =
    sortOrder === SortOrder.Asc ? (a, b) => a > b : (a, b) => a < b;
  return algorithm === Algorithm.SelectionSort
    ? new SelectionSorter(items, order)
    : new BubbleSorter(items, order);
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
      return { value, state };
    });
  }

  isDone(): boolean {
    return this.left >= this.items.length;
  }

  next() {
    if (this.right >= this.items.length - 1) {
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
    this.min = this.order(this.items[this.right], this.items[this.min])
      ? this.min
      : this.right;
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
      } else if (
        this.bubble != null &&
        (index === this.bubble || index === this.bubble + 1)
      ) {
        state = ElementStates.Changing;
      }
      return { value, state };
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
