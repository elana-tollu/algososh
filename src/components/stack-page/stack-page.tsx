import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.settings}>
        <div className={styles.inputField}>
            <Input
              isLimitText={true}
              maxLength={4}
            />
        </div>

        <div className={styles.buttons}>
          <Button 
            text={"Добавить"}
          />
          <Button 
            text={"Удалить"}
          />
          <Button 
            style={{marginLeft:"68px"}}
            text={"Очистить"}
          />
        </div>
          
      </div>

      <div className={styles.visual}>
      <Circle 
        letter={"1"}
        index={0}
        />
        <Circle 
        letter={"2"}
        index={1}
        />
        <Circle 
        letter={"3"}
        index={3}
        />
        <Circle 
        letter={"4"}
        head={"top"}
        index={4}
        />
      </div>
    </SolutionLayout>
  );
};
