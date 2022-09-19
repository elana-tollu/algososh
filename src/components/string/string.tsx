import React, { useEffect, useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { IStringItem, StringVisual } from './string-visual';
import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [reverser, setReverser] = useState<Reverser<string>>(new Reverser([]));
  const [run, setRun] = useState<boolean>(false);
  const [result, setResult] = useState<IStringItem[]>([]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (changeEvent) => {
    setInput(changeEvent.target.value);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    const reverser = new Reverser(input.split(''));
    setResult(reverser.getResult());
    setReverser(reverser);
    setRun(true);
  }

  useEffect(() => {
    if (run && !reverser.isDone()) {
      setTimeout(() => {
        reverser.next();
        setResult(reverser.getResult());
      }, 500); 
    } else {
      setRun(false);
    }
  });

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <div className={styles.inputField}>
          <Input
            isLimitText={true}
            maxLength={11}
            onChange={handleChange}
          />
        </div>
        <Button 
          text={"Развернуть"}
          linkedList='small'
          onClick={handleClick}
          disabled={!input}
          isLoader={run==true}
        />
      </div>

      <StringVisual items={result}/>
     
    </SolutionLayout>
  );
};

class Reverser<Item> {
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