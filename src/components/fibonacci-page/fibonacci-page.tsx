import React, { useCallback, useEffect, useState } from "react";
import { updateDecorator } from "typescript";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'
import { FibonacciVisual } from "./fibonacci-visual";

export const FibonacciPage: React.FC = () => {
  const [fibonacci, setFibonacci] = useState<number[]>([]); // начальное состояние функции и его обновление, возвращает массив чисел
  const [n, setN] = useState<number>(0); // 
  const [run, setRun] = useState<boolean>(false);  // начальное состояние кнопки и функция его обновления
 
  useEffect(() => {
    if (run && fibonacci.length < n) {
      setTimeout(() => setFibonacci(nextFibonacci), 500); // F, обновляющей состояние Фибоначчи, в качестве аргумента передается F с расчетом следующего члена последовательности Ф, вторым аргументом время задержки перед выполнением
    } else {
      setRun(false);
    }
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (changeEvent) => {
    const n = parseInt(changeEvent.target.value);
    setN(n);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setFibonacci([]);
    setRun(true);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input}>
        <div className={styles.inputField}>
          <Input
            type='number'
            isLimitText={true}
            max={19}
            onChange={handleChange}
          />
        </div>
        <Button 
          text={"Рассчитать"}
          linkedList='small'
          onClick={handleClick}
          disabled={!n || n > 19}
          isLoader={run==true}
        />
      </div>

      <div /*className={styles.visual}*/>
       <FibonacciVisual items={fibonacci}/>

      </div>
     
    </SolutionLayout>
  );
};
 

function nextFibonacci (numbers: number[]): number[] { // добавляет "следующий" элемент последовательности
  const n = numbers.length;
  if (n < 1) {
    return [...numbers, 0];
  } if (n < 2) {
    return [...numbers, 1];
  } else {
    return [...numbers, (numbers[n - 2] + numbers[n - 1])];
  }
};