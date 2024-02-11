import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ItemList from '../components/ItemList';

test('adiciona um novo item à lista', () => {
  render(<ItemList />);
  const inputElement = screen.getByPlaceholderText('Digite o nome do item');
  const buttonElement = screen.getByText('Adicionar Item');
  
  fireEvent.change(inputElement, { target: { value: 'Novo Item' } });
  fireEvent.click(buttonElement);
  
  expect(screen.getByText('Novo Item')).toBeInTheDocument();
});
