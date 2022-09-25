export class Queue<Item> {
  items: (Item|undefined)[];

  constructor(size: number) {
    this.items = new Array(size).fill(undefined); 
  }

  nextTailIndex(): number|undefined {
    const tailIndex = findLastIndex(this.items, isDefined);
    if (tailIndex < this.items.length - 1) {
      return tailIndex + 1;
    }
    return undefined;
  }

  headIndex(): number|undefined {
    const headIndex = this.items.findIndex(isDefined);
    if (headIndex < 0) {
      return undefined;
    }
    return headIndex;
  }

  enqueue(item: Item): void {
    const index = this.nextTailIndex();
    if (index !== undefined) {
      this.items[index] = item;
    }
   }

   dequeue(): Item {
    const headIndex = this.headIndex();
    if (headIndex === undefined) {
      throw 'Queue is empty!';
    }
    const item = this.items[headIndex]!;
    this.items[headIndex] = undefined;
    console.log(this.items[headIndex]);
    return item;
  }

  clear(): void {
    this.items.fill(undefined); 
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getResult(): (Item|undefined)[] {
    return [...this.items];
  }
} 

export function isDefined<Item> (item?: Item): boolean {
    return !!item;
}

export function findLastIndex<Item> (items: Item[], predicate: (item: Item) => boolean): number {
    let arr = [...items];
    arr.reverse();
    const index = arr.findIndex(predicate);
    if (index === -1) {
        return -1;
    }
    return arr.length - 1 - index;
}
