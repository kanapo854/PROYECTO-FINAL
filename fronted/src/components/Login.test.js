import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';  // Importa desde la misma carpeta

describe('Login Component', () => {
  test('renderiza el título correctamente', () => {
    render(<Login />);
    // Usa getByRole para el heading (más específico)
    expect(
      screen.getByRole('heading', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test('renderiza el botón de submit', () => {
    render(<Login />);
    // Usa getByRole para el botón
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test('permite ingresar email y contraseña', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});