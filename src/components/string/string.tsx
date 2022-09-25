import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { StringVisual } from './string-visual';
import styles from './string.module.css';
import { IStringItem, Reverser } from './utils';

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
            value={input}
          />
        </div>
        <Button 
          text={"Развернуть"}
          linkedList='small'
          onClick={handleClick}
          disabled={!input}
          isLoader={run}
        />
      </div>

      <StringVisual items={result}/>
     
    </SolutionLayout>
  );
};

