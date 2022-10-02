import {expect, jest, test} from '@jest/globals';
import { Reverser } from './utils';


describe('Reverser', () => {
    test('empty string', () => {
        //prepare  System Under Test
        const reverser = new Reverser([]);
        
        //act
        while(!reverser.isDone()) {
            reverser.next();
        } 
        const result = reverser.getResult();

        //check
        expect(result).toStrictEqual([]);
    });

    test('single character', () => {
        //prepare  
        const reverser = new Reverser(['a']);
        
        //act
        while(!reverser.isDone()) {
            reverser.next();
        } 
        const result = reverser.getResult();

        //check
        expect(result).toStrictEqual([{
                letter: 'a',
                state: 'modified',
            }]);
    });

    test('odd number of characters', () => {
        //prepare  
        const reverser = new Reverser(['a', 'b', 'c']);
        
        //act
        while(!reverser.isDone()) {
            reverser.next();
        } 
        const result = reverser.getResult();

        //check
        expect(result).toStrictEqual([
            {
                letter: 'c',
                state: 'modified',
            },
            {
                letter: 'b',
                state: 'modified',
            },
            {
                letter: 'a',
                state: 'modified',
            }
        ]);
    }); 

    test('even number of characters', () => {
        //prepare  
        const reverser = new Reverser(['a', 'b', 'c', 'd']);
        
        //act
        while(!reverser.isDone()) {
            reverser.next();
        } 
        const result = reverser.getResult();

        //check
        expect(result).toStrictEqual([
            {
                letter: 'd',
                state: 'modified',
            },
            {
                letter: 'c',
                state: 'modified',
            },
            {
                letter: 'b',
                state: 'modified',
            },
            {
                letter: 'a',
                state: 'modified',
            }
        ]);
    });
});