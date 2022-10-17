import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './list-page.module.css';
import { ListVisual } from "./list-visual";
import { randomLinkedList } from "./utils";



export const ListPage: React.FC = () => {
  const [list] = useState(randomLinkedList());
  const [listState, setListState] = useState(list.getResult());
  const [valueInput, setValueInput] = useState('');
  const [indexInput, setIndexInput] = useState('');

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setValueInput(changeEvent.target.value);
  }
  const handleIndexChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setIndexInput(changeEvent.target.value);
  }

  const doNext = () => {
    setTimeout(() => {
      setListState(list.getResult());
      if (list.isDone()) {
        setValueInput('');
        setIndexInput('');
        return;
      }
      list.next();
      doNext();
    }, 2000);
  }

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = () => {
    list.addByIndex(valueInput, parseInt(indexInput));
    doNext();
  }

  const handleAddToHead: React.MouseEventHandler<HTMLButtonElement> = () => {
    list.addByIndex(valueInput, 0);
    doNext();
  }

  const handleAddToTail: React.MouseEventHandler<HTMLButtonElement> = () => {
    list.append(valueInput);
    doNext();
  }

  const handleRemove:  React.MouseEventHandler<HTMLButtonElement> = () => {
    list.deleteByIndex (parseInt(indexInput));
    doNext();
  }

  const handleRemoveFromHead:  React.MouseEventHandler<HTMLButtonElement> = () => {
    list.deleteByIndex (0);
    doNext();
  }
  const handleRemoveFromTail: React.MouseEventHandler<HTMLButtonElement> = () => {
    list.deleteTail();
    doNext();
  }

  return (
    <SolutionLayout title="Связный список">

      <div className={styles.settings}>
        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите значение"}
                isLimitText={true}
                maxLength={4}
                value={valueInput}
                onChange={handleValueChange}
                data-cy="item-to-add"
              />
          </div>
          <Button 
            text={"Добавить в head"}
            disabled={!valueInput}
            linkedList={"small"}
            onClick={handleAddToHead}
          />
          <Button 
            text={"Добавить в tail"}
            disabled={!valueInput}
            linkedList={"small"}
            onClick={handleAddToTail}
          />
          <Button 
            text={"Удалить из head"}
            disabled={false}
            linkedList={"small"}
            onClick={handleRemoveFromHead}
          />
          <Button 
            text={"Удалить из tail"}
            disabled={false}
            linkedList={"small"}
            onClick={handleRemoveFromTail}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите индекс"}
                type="number"
                value={indexInput}
                onChange={handleIndexChange}
                data-cy="index-to-add"
              />
          </div>
          <Button 
            text={"Добавить по индексу"}
            disabled={!valueInput || !indexInput}
            linkedList={"big"}
            onClick={handleAdd}
          />
          <Button 
            text={"Удалить по индексу"}
            disabled={!indexInput}
            linkedList={"big"}
            onClick={handleRemove}
          />
        </div>
          
      </div>

      <ListVisual listState={listState} />

    </SolutionLayout>
  );
};
