import { ElementStates } from "../../types/element-states";
import { randomInt } from "../../utils";

export interface ISecondaryValue<Item> { 
    readonly item: Item;
    readonly index: number;
  }

export interface IPrimaryValue<Item> { 
    item: Item|undefined;
    state: ElementStates;
}

export interface ILinkedListState<Item> {
    items: IPrimaryValue<Item>[];
    adding?: ISecondaryValue<Item>;
    removing?: ISecondaryValue<Item>;
}

export class List<Item> {
  items: Item[];
  adding?: {
    value: Item;
    destination: number;
    currentPosition: number;
    isInPlace: boolean;
  };
  removing?: {
    destination: number;
    currentPosition: number;
    isRemoved: boolean;
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

  remove(index: number): void {
    this.removing = {
      destination: index,
      currentPosition: 0,
      isRemoved: false
    }
  }

  removeFromTail(): void {
    this.removing = {
      destination: this.items.length - 1,
      currentPosition: this.items.length - 1,
      isRemoved: false
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

    if (this.removing)  {
      if (this.removing.currentPosition < this.removing.destination) {
        this.removing.currentPosition++;
      } 
      else if (this.removing.currentPosition == this.removing.destination && !this.removing.isRemoved) {
        this.removing.isRemoved = true;
      }
      else if(this.removing.isRemoved) {
        this.items.splice(this.removing.destination, 1)
        this.removing = undefined
      }
    }
  }

  isDone(): boolean {
    return !this.adding && !this.removing;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getResult(): ILinkedListState<Item> {
    let items: IPrimaryValue<Item>[] = [...this.items].map(item => ({ 
      item,
      state: ElementStates.Default
    }));
    let adding: ISecondaryValue<Item>|undefined;
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
    
    let removing: ISecondaryValue<Item>|undefined;
    if (this.removing) {
      if (this.removing.isRemoved) {
        removing = {
          item: items[this.removing.destination].item!,
          index: this.removing.currentPosition
        }
        items[this.removing.destination] = {
          item: undefined,
          state: ElementStates.Default
        }
      } 
      else if (this.removing.destination === this.items.length - 1) {
        items[this.removing.destination].state = ElementStates.Changing;
      }
      else {
        for (let i = 0; i <= this.removing.currentPosition; i++) {
          items[i].state = ElementStates.Changing;
        }
      }
    };

    return {
      items,
      adding,
      removing
    };
  }
} 

export function randomLinkedList(): List<string> {
        const n = randomInt(4, 6);
        let arr = [];
        for (let i = 0; i < n; i++) {
          arr.push('' + randomInt(0, 9999));
        }
    
   return new List(arr);
}