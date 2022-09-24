import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { findLastIndex, isDefined, QueueVisual } from "./queue-visual";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [items, setItems] = useState<(string|undefined)[]>(new Array(7).fill(undefined));
  
  const [queue, setQueue] = useState<Queue<string>>(new Queue(7));
  const [changing, setChanging] = useState<number|undefined>(undefined);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setInput(changeEvent.target.value);
  }

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    const index = queue.nextTailIndex();
    if (index === undefined) {
      return;
    }
    setChanging(index);
    setTimeout(() => setChanging(undefined), 1000);
    setTimeout(() => {
      queue.enqueue(input);
      setItems(queue.getResult());
    }, 500);
    setInput('');
  }
  
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    const index = queue.headIndex();
    setChanging(index);
    setTimeout(() => setChanging(undefined), 1000);
    setTimeout(() => {
      queue.dequeue();
      setItems(queue.getResult());
    }, 500);
    setInput('');
  }

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = buttonEvent => {
    const newQueue: Queue<string> = new Queue(7);
    setQueue(newQueue);
    setItems(newQueue.getResult());
    setInput('');
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.settings}>
        <div className={styles.inputField}>
            <Input
              isLimitText={true}
              maxLength={4}
              value={input}
              onChange={handleChange}
            />
        </div>

        <div className={styles.buttons}>
          <Button 
            text={"Добавить"}
            disabled={!input}
            onClick={handleAdd}
          />
          <Button 
            text={"Удалить"}
            disabled={queue.headIndex() === undefined}
            onClick={handleRemove}
          />
          <Button 
            style={{marginLeft:"68px"}}
            text={"Очистить"}
            disabled={queue.headIndex() === undefined}
            onClick={handleReset}
          />
        </div>
          
      </div>

        <QueueVisual items={items} changing={changing}/>
      <div className={styles.visual}>
      
      </div>

    </SolutionLayout>
  );
};

class Queue<Item> {
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

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getResult(): (Item|undefined)[] {
    return [...this.items];
  }
} 
