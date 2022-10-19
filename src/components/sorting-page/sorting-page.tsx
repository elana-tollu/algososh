import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrayVisual } from "./array-visual";
import styles from './sorting-page.module.css';
import { Algorithm, createSorter, ISorter, SortOrder } from "./utils";


export const SortingPage: React.FC = () => {
  const [sorter, setSorter] = useState<ISorter|undefined>();
  const [run, setRun] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>(randomArr());
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.SelectionSort);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [_, setTicks] = useState<number>(0);

  const handleNew: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setArr(randomArr());
    setSorter(undefined);
  }

  const handleAsc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSortOrder(SortOrder.Asc);
    setSorter(createSorter(arr, algorithm, SortOrder.Asc));
    setRun(true);
  }

  const handleDesc: React.MouseEventHandler<HTMLButtonElement> = (clickEvent) => {
    setSortOrder(SortOrder.Desc);
    setSorter(createSorter(arr, algorithm, SortOrder.Desc));
    setRun(true);
  }

  const selectBubbleSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.BubbleSort);
  }

  const selectSelectionSort: React.FormEventHandler<HTMLInputElement> = (event) => {
    setAlgorithm(Algorithm.SelectionSort);
  }

  useEffect(() => {
    if (run && sorter !== undefined && !sorter.isDone()) {
      setTimeout(() => {
        sorter!.next();
        setTicks(ticks => ticks + 1);
      }, 500); 
    } else {
      setRun(false);
    }
  });

  const items = sorter !== undefined ? sorter.getResult() : arr.map(value => {
    let state = ElementStates.Default;
    return {value, state}
  });

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.settings}>
        <div className={styles.radioButtons}>
          <RadioInput 
            label={"Выбор"}
            checked={algorithm === Algorithm.SelectionSort}
            onChange={selectSelectionSort}
          />
          <RadioInput 
            label={"Пузырёк"}
            checked={algorithm === Algorithm.BubbleSort}
            onChange={selectBubbleSort}
          />
        </div>
        <div className={styles.buttons}>
          <Button 
            onClick={handleAsc}
            sorting={Direction.Ascending}
            text={"По возрастанию"}
            linkedList='medium'
            isLoader={run && sortOrder === SortOrder.Asc}
            disabled={run}
          />
          <Button 
            onClick={handleDesc}
            sorting={Direction.Descending}
            text={"По убыванию"}
            linkedList='medium'
            isLoader={run && sortOrder === SortOrder.Desc}
            disabled={run}
          />
          <Button 
            onClick={handleNew}
            style={{marginLeft:"68px"}}
            text={"Новый массив"}
            linkedList='medium'
            disabled={run}
          />
        </div>
      </div>

      <div className={styles.visual}>
         <ArrayVisual items={items} />
      </div>

    </SolutionLayout>
  );
};
