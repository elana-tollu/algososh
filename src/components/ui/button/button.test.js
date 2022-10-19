import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Direction } from '../../../types/direction';
import { Button } from './button';

describe('Button', () => { 
  test('should render with text', () => {
      const tree = renderer
        .create(<Button  text="Надпись на кнопке"/>)
        .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test('should render without text', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render sorting ascending', () => {
    const tree = renderer
      .create(<Button sorting={Direction.Ascending}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render sorting descending', () => {
    const tree = renderer
      .create(<Button sorting={Direction.Descending}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should be disabled', () => {
    const tree = renderer
      .create(<Button  
        text="Надпись на кнопке" 
        disabled={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should show loader', () => {
    const tree = renderer
      .create(<Button  
        text="Надпись на кнопке" 
        isLoader={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should handle click', () => {
    const handleClick = jest.fn();
    render(<Button  
      text="Нажми меня" 
      onClick={handleClick}
    />)
    
    userEvent.click(screen.getByText('Нажми меня'));

    expect(handleClick).toBeCalled();
  });
});