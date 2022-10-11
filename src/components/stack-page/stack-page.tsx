import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { StackVisual } from "./stack-visual";
import { Stack } from "./utils";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<Stack<string>>(new Stack<string>());
  const [input, setInput] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [changing, setChanging] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setInput(changeEvent.target.value);
  }

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = () => {
    stack.push(input);
    setItems(stack.getResult());
    setChanging(true);
    setTimeout(() => setChanging(false), 500);
    setInput('');
  }
  
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    setChanging(true);
    setTimeout(() => {
      stack.pop();
      setItems(stack.getResult());
      setChanging(false);
    }, 500);
    setInput('');
  }

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newStack = new Stack<string>();
    setStack(newStack);
    setItems(newStack.getResult());
    setInput('');
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.settings}>
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
            disabled={stack.isEmpty()}
            onClick={handleRemove}
          />
          <Button 
            style={{marginLeft:"68px"}}
            text={"Очистить"}
            disabled={stack.isEmpty()}
            onClick={handleReset}
          />
        </div>
          
      </div>
        
      <StackVisual items={items} changing={changing}/>
  
    </SolutionLayout>
  );
};
