import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Direction } from '../../../types/direction';
import { Button } from './button';

describe('Button', () => { 
  test('with text', () => {
      const tree = renderer
        .create(<Button  text="Надпись на кнопке"/>)
        .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test('without text', () => {
    const tree = renderer
      .create(<Button  sorting={Direction.Ascending}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
});

  test('disabled', () => {
    const tree = renderer
      .create(<Button  
        text="Надпись на кнопке" 
        disabled={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('loading', () => {
    const tree = renderer
      .create(<Button  
        text="Надпись на кнопке" 
        isLoader={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('click', () => {
    const handleClick = jest.fn();
    render(<Button  
      text="Нажми меня" 
      onClick={handleClick}
    />)
    
    userEvent.click(screen.getByText('Нажми меня'));

    expect(handleClick).toBeCalled();
  });
});