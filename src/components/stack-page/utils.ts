
export class Stack<Item> {
    #items: Item[];
  
    constructor() {
      this.#items = [];
    }
  
    push(item: Item) {
      this.#items.push(item);
     }
  
    pop(): Item {
      const item = this.#items.pop();
      if (item === undefined) {
        throw 'Stack is empty!';
      }
  
      return item;
    }
  
    isEmpty(): boolean {
      return this.#items.length === 0;
    }
  
    getResult(): Item[] {
      return [...this.#items];
    }
  }
  