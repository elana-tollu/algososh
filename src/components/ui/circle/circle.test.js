import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle', () => { 
    test('without text', () => {
        const tree = renderer
          .create(<Circle />)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with text', () => {
        const tree = renderer
          .create(<Circle  letter="A"/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with string head', () => {
        const tree = renderer
          .create(<Circle  head="A"/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with ReactElement head', () => {
        const tree = renderer
          .create(<Circle  head={<div>A</div>}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with string tail', () => {
        const tree = renderer
          .create(<Circle  tail="U"/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with index', () => {
        const tree = renderer
          .create(<Circle  index={3}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('small', () => {
        const tree = renderer
          .create(<Circle  isSmall/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('with ReactElement tail', () => {
        const tree = renderer
          .create(<Circle  tail={<div>U</div>}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('state default', () => {
        const tree = renderer
          .create(<Circle  state={ElementStates.Default}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('state changing', () => {
        const tree = renderer
          .create(<Circle  state={ElementStates.Changing}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    test('state modified', () => {
        const tree = renderer
          .create(<Circle  state={ElementStates.Modified}/>)
          .toJSON();
    
        expect(tree).toMatchSnapshot();
    });
})