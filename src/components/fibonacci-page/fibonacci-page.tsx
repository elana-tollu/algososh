import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'
import { FibonacciVisual } from "./fibonacci-visual";
import { nextFibonacci } from "./utils";

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
            value={'' + n}
          />
        </div>
        <Button 
          text={"Рассчитать"}
          linkedList='small'
          onClick={handleClick}
          disabled={!n || n > 19}
          isLoader={run}
        />
      </div>

      <div /*className={styles.visual}*/>
       <FibonacciVisual items={fibonacci}/>

      </div>
     
    </SolutionLayout>
  );
};
 
