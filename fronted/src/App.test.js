import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el texto Bienvenido', () => {
  render(<App />);
  const texto = screen.getByText(/bienvenido/i);
  expect(texto).toBeInTheDocument();
});
