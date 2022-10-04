import {expect, jest, test} from '@jest/globals';
import { ElementStates } from '../../types/element-states';
import {  Algorithm, createSorter, SortOrder } from './utils';


describe('BubbleSort', () => { 
    test('empty array', () => {
        //prepare 
        const sorter = createSorter([], Algorithm.BubbleSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([]);
    });

    test('single element array', () => {
        //prepare 
        const sorter = createSorter([1], Algorithm.BubbleSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([{
            value: 1, 
            state: ElementStates.Modified
        }]);
    });

    test('ascending', () => {
        //prepare 
        const sorter = createSorter([3, 2, 8], Algorithm.BubbleSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([
            {
                value: 2, 
                state: ElementStates.Modified
            }, 
            {
                value: 3, 
                state: ElementStates.Modified
            },
            {
                value: 8, 
                state: ElementStates.Modified
            }
        ]);
    });

    test('descending', () => {
        //prepare 
        const sorter = createSorter([3, 2, 8], Algorithm.BubbleSort, SortOrder.Desc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([
            {
                value: 8, 
                state: ElementStates.Modified
            }, 
            {
                value: 3, 
                state: ElementStates.Modified
            },
            {
                value: 2, 
                state: ElementStates.Modified
            }
        ]);
    });
})

describe('SelectionSort', () => { 
    test('empty array', () => {
        //prepare 
        const sorter = createSorter([], Algorithm.SelectionSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([]);
    });

    test('single element array', () => {
        //prepare 
        const sorter = createSorter([1], Algorithm.SelectionSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([{
            value: 1, 
            state: ElementStates.Modified
        }]);
    });

    test('ascending', () => {
        //prepare 
        const sorter = createSorter([3, 2, 8], Algorithm.SelectionSort, SortOrder.Asc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([
            {
                value: 2, 
                state: ElementStates.Modified
            }, 
            {
                value: 3, 
                state: ElementStates.Modified
            },
            {
                value: 8, 
                state: ElementStates.Modified
            }
        ]);
    });

    test('descending', () => {
        //prepare 
        const sorter = createSorter([3, 2, 8], Algorithm.SelectionSort, SortOrder.Desc);
        
        //act
        while(!sorter.isDone()) {
            sorter.next();
        } 
        const result = sorter.getResult();

        //check
        expect(result).toStrictEqual([
            {
                value: 8, 
                state: ElementStates.Modified
            }, 
            {
                value: 3, 
                state: ElementStates.Modified
            },
            {
                value: 2, 
                state: ElementStates.Modified
            }
        ]);
    });
})