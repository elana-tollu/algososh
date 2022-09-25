import { ElementStates } from '../../types/element-states';

export interface IStringItem {
    letter: string,
    state: ElementStates
}

export class Reverser<Item> {
    result: {
      letter: Item,
      state: ElementStates
    }[];
  
    constructor(items: Item[]) {
      this.result = items.map(letter => ({
        letter,
        state: ElementStates.Default
      }));
      if (items.length === 0) {
        return;
      }
      this.result[0].state = ElementStates.Changing;
      this.result[items.length - 1].state = ElementStates.Changing;
    }
  
    getResult() {
      return [...this.result];
    }
  
    isDone() {
      return this.result.every(el => el.state === ElementStates.Modified);
    }
  
    next() {
      const leftChanging = this.result.findIndex( el => el.state === ElementStates.Changing);
      const rightChanging = this.result.length - 1 - leftChanging;
      const leftValue = this.result[leftChanging];
      this.result[leftChanging] = this.result[rightChanging];
      this.result[rightChanging] = leftValue;
      this.result[leftChanging].state = ElementStates.Modified;
      this.result[rightChanging].state = ElementStates.Modified;
      if (leftChanging + 1 <= rightChanging - 1) {
        this.result[leftChanging + 1].state = ElementStates.Changing;
        this.result[rightChanging - 1].state = ElementStates.Changing;
      }
    }
  }