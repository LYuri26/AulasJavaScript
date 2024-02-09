import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ButtonCounter from '../ButtonCounter';

test('incrementa o contador ao clicar no botão', () => {
  render(<ButtonCounter />);
  const button = screen.getByText('Clique para contar');
  const counterText = screen.getByText('Você clicou 0 vezes');

  expect(counterText).toBeInTheDocument(); // Verifica se o contador começa em 0

  fireEvent.click(button); // Simula o clique no botão
  expect(counterText).toHaveTextContent('Você clicou 1 vezes'); // Verifica se o contador foi incrementado para 1

  fireEvent.click(button); // Simula mais um clique no botão
  expect(counterText).toHaveTextContent('Você clicou 2 vezes'); // Verifica se o contador foi incrementado para 2
});
