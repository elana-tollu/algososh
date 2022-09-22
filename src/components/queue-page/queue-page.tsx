import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <SolutionLayout title="Очередь">
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
            disabled={!input}
          />
          <Button 
            text={"Удалить"}
            disabled={true}
          />
          <Button 
            style={{marginLeft:"68px"}}
            text={"Очистить"}
            disabled={true}
          />
        </div>
          
      </div>

      <div className={styles.visual}>
      <Circle 
        letter={"3"}
        head={"head"}
        tail={""}
        index={0}
        />
        <Circle 
        letter={"5"}
        head={""}
        tail={""}
        index={1}
        />
        <Circle 
        letter={"9"}
        head={""}
        tail={"tail"}
        index={2}
        />
        <Circle 
        letter={""}
        head={""}
        tail={""}
        index={3}
        />
        <Circle 
        letter={""}
        head={""}
        tail={""}
        index={4}
        />
        <Circle 
        letter={""}
        head={""}
        tail={""}
        index={5}
        />
        <Circle 
        letter={""}
        head={""}
        tail={""}
        index={6}
        />
      </div>

    </SolutionLayout>
  );
};
