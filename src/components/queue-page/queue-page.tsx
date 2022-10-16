import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { QueueVisual } from "./queue-visual";
import { Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [items, setItems] = useState<(string|undefined)[]>(new Array(7).fill(undefined));
  
  const [queue, setQueue] = useState<Queue<string>>(new Queue(7));
  const [changing, setChanging] = useState<number|undefined>(undefined);
  const [enqueueing, setEnqueueing] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setInput(changeEvent.target.value);
  }

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = queue.nextTailIndex();
    if (index === undefined) {
      return;
    }
    setChanging(index);
    setEnqueueing(true);
    setTimeout(() => setChanging(undefined), 1000);
    setTimeout(() => {
      queue.enqueue(input);
      setItems(queue.getResult());
      setEnqueueing(false);
    }, 500);
    setInput('');
  }
  
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = queue.headIndex();
    setChanging(index);
    setTimeout(() => setChanging(undefined), 1000);
    setTimeout(() => {
      queue.dequeue();
      setItems(queue.getResult());
    }, 500);
    setInput('');
  }

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newQueue: Queue<string> = new Queue(7);
    setQueue(newQueue);
    setItems(newQueue.getResult());
    setInput('');
  }

  return (
    <SolutionLayout title="Очередь">
      <div 
        className={styles.settings}
        data-cy-enqueueing={enqueueing}
        data-cy-changing={!!changing}
        >
        <div className={styles.inputField}>
            <Input
              isLimitText={true}
              maxLength={4}
              value={input}
              onChange={handleChange}
              data-cy="item-to-add"
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
