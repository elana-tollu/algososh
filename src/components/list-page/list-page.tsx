import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './list-page.module.css';

export const ListPage: React.FC = () => {


  return (
    <SolutionLayout title="Связный список">

      <div className={styles.settings}>
        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите значение"}
                isLimitText={true}
                maxLength={4}
              />
          </div>
          <Button 
            text={"Добавить в head"}
            disabled={true}
            linkedList={"small"}
          />
          <Button 
            text={"Добавить в tail"}
            disabled={true}
            linkedList={"small"}
          />
          <Button 
            text={"Удалить из head"}
            disabled={true}
            linkedList={"small"}
          />
          <Button 
            text={"Удалить из tail"}
            disabled={true}
            linkedList={"small"}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.inputField}>
              <Input
                placeholder={"Введите индекс"}
              />
          </div>
          <Button 
            text={"Добавить по индексу"}
            disabled={true}
            linkedList={"big"}
          />
          <Button 
            text={"Удалить по индексу"}
            disabled={true}
            linkedList={"big"}
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
        <ArrowIcon 
          fill={"#0032FF"}
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
        tail={""}
        index={2}
        isSmall={true}
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
        tail={"tail"}
        index={5}
        />
      </div>

    </SolutionLayout>
  );
};
