import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUser from './CreateUser';

describe('CreateUser Component', () => {
  test('renderiza el título correctamente', () => {
    render(<CreateUser />);
    expect(
      screen.getByRole('heading', { name: /crear usuario/i })
    ).toBeInTheDocument();
  });

  test('renderiza todos los campos del formulario', () => {
    render(<CreateUser />);
    
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  test('permite ingresar datos en los campos', async () => {
    render(<CreateUser />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Nombre'), 'María');
    await user.type(screen.getByLabelText('Apellido'), 'García');
    await user.type(screen.getByLabelText('Email'), 'maria@example.com');
    await user.type(screen.getByLabelText('Contraseña'), 'Secure123#');

    expect(screen.getByLabelText('Nombre')).toHaveValue('María');
    expect(screen.getByLabelText('Apellido')).toHaveValue('García');
    expect(screen.getByLabelText('Email')).toHaveValue('maria@example.com');
    expect(screen.getByLabelText('Contraseña')).toHaveValue('Secure123#');
  });
});