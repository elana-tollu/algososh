import { ElementStates } from "../../types/element-states";
import { randomInt } from "../../utils";

export interface ISecondaryValue<Item> {
  readonly item: Item;
  readonly index: number;
}

export interface IPrimaryValue<Item> {
  item: Item | undefined;
  state: ElementStates;
}

export interface ILinkedListState<Item> {
  items: IPrimaryValue<Item>[];
  adding?: ISecondaryValue<Item>;
  removing?: ISecondaryValue<Item>;
}

class LinkedListNode<Item> {
  value: Item;
  nextNode?: LinkedListNode<Item>;

  constructor(value: Item) {
    this.value = value;
  }

  linkTo(nextNode?: LinkedListNode<Item>) {
    this.nextNode = nextNode;
  }

  removeLink() {
    this.nextNode = undefined;
  }

  hasNext(): boolean {
    return this.nextNode !== undefined;
  }

  update(value: Item) {
    this.value = value;
  }
}

export class LinkedList<Item> {
  head?: LinkedListNode<Item>;
  length: number = 0;

  items?: Item[];
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

  constructor(items?: Item[]) {
    if (!items) {
      return;
    }
    let tail: LinkedListNode<Item> | undefined;
    for (let i = 0; i < items.length; i++) {
      const node = new LinkedListNode(items[i]);
      this.length++;
      if (!tail) {
        this.head = node;
      } else {
        tail.linkTo(node);
      }
      tail = node;
    }
  }

  addByIndex(value: Item, index: number): void {
    this.adding = {
      value,
      destination: index,
      currentPosition: 0,
      isInPlace: false,
    };
  }

  append(value: Item): void {
    this.adding = {
      value,
      destination: this.length,
      currentPosition: this.length - 1,
      isInPlace: false,
    };
  }

  prepend(value: Item): void {
    this.addByIndex(value, 0);
  }

  deleteByIndex(index: number): void {
    this.removing = {
      destination: index,
      currentPosition: 0,
      isRemoved: false,
    };
  }

  deleteHead(): void {
    this.deleteByIndex(0);
  }

  deleteTail(): void {
    this.removing = {
      destination: this.length - 1,
      currentPosition: this.length - 1,
      isRemoved: false,
    };
  }

  toArray(): Item[] {
    let result: Item[] = [];
    let tail = this.head;
    while (tail) {
      result.push(tail.value);
      tail = tail.nextNode;
    }
    return result;
  }

  next(): void {
    if (this.adding) {
      if (
        this.adding.currentPosition < this.adding.destination &&
        this.adding.currentPosition === this.length - 1
      ) {
        let tail = this.head;
        while (tail?.hasNext()) {
          tail = tail.nextNode;
        }
        const node = new LinkedListNode(this.adding.value);
        if (!tail) {
          this.head = node;
        } else {
          tail.linkTo(node);
        }
        this.length++;
        this.adding.isInPlace = true;
      } else if (this.adding.currentPosition < this.adding.destination) {
        this.adding.currentPosition++;
      } else if (
        this.adding.currentPosition == this.adding.destination &&
        !this.adding.isInPlace
      ) {
        let previousNode: LinkedListNode<Item> | undefined;
        for (let i = 0; i < this.adding.destination; i++) {
          previousNode = previousNode?.nextNode || this.head;
        }
        const node = new LinkedListNode(this.adding.value);
        node.linkTo(previousNode?.nextNode || this.head);
        if (!previousNode) {
          this.head = node;
        } else {
          previousNode.linkTo(node);
        }
        this.length++;
        this.adding.isInPlace = true;
      } else if (this.adding.isInPlace) {
        this.adding = undefined;
      }
    }

    if (this.removing) {
      if (this.removing.currentPosition < this.removing.destination) {
        this.removing.currentPosition++;
      } else if (
        this.removing.currentPosition == this.removing.destination &&
        !this.removing.isRemoved
      ) {
        this.removing.isRemoved = true;
      } else if (this.removing.isRemoved) {
        let previousNode: LinkedListNode<Item> | undefined;
        for (let i = 0; i < this.removing.destination; i++) {
          previousNode = previousNode?.nextNode || this.head;
        }
        const node = previousNode?.nextNode || this.head;
        if (!previousNode) {
          this.head = node?.nextNode;
        } else {
          previousNode.linkTo(node?.nextNode);
        }
        this.length--;
        this.removing = undefined;
      }
    }
  }

  isDone(): boolean {
    return !this.adding && !this.removing;
  }

  isEmpty(): boolean {
    return !this.head;
  }

  getResult(): ILinkedListState<Item> {
    let items: IPrimaryValue<Item>[] = this.toArray().map((item) => ({
      item,
      state: ElementStates.Default,
    }));
    let adding: ISecondaryValue<Item> | undefined;
    if (this.adding) {
      if (this.adding.isInPlace) {
        items[this.adding.destination].state = ElementStates.Modified;
      } else {
        adding = {
          item: this.adding.value,
          index: this.adding.currentPosition,
        };
      }
    }

    let removing: ISecondaryValue<Item> | undefined;
    if (this.removing) {
      if (this.removing.isRemoved) {
        removing = {
          item: items[this.removing.destination].item!,
          index: this.removing.currentPosition,
        };
        items[this.removing.destination] = {
          item: undefined,
          state: ElementStates.Default,
        };
      } else if (this.removing.destination === this.length - 1) {
        items[this.removing.destination].state = ElementStates.Changing;
      } else {
        for (let i = 0; i <= this.removing.currentPosition; i++) {
          items[i].state = ElementStates.Changing;
        }
      }
    }

    return {
      items,
      adding,
      removing,
    };
  }
}

export function randomLinkedList(): LinkedList<string> {
  const n = randomInt(4, 6);
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push("" + randomInt(0, 9999));
  }

  return new LinkedList(arr);
}
