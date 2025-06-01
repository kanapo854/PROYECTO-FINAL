// src/components/CreateTask.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateTask from './CreateTask';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Mocks
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('jwt-decode');
jest.mock('./Alert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CreateTask Component', () => {
  const mockNavigate = jest.fn();
  const mockUser = { id: 1 };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jwtDecode.mockReturnValue(mockUser);
    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renderiza el formulario correctamente', () => {
    render(<CreateTask />);
    
    expect(screen.getByRole('heading', { name: /crear nueva tarea/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha/i)).toBeInTheDocument();
    expect(screen.getByText(/pendiente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear tarea/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
  });

  test('permite ingresar datos en los campos', async () => {
    render(<CreateTask />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/título/i), 'Nueva tarea');
    await user.type(screen.getByLabelText(/descripción/i), 'Descripción de prueba');
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2023-12-31' } });

    expect(screen.getByLabelText(/título/i)).toHaveValue('Nueva tarea');
    expect(screen.getByLabelText(/descripción/i)).toHaveValue('Descripción de prueba');
    expect(screen.getByLabelText(/fecha/i)).toHaveValue('2023-12-31');
  });

  test('envía el formulario correctamente', async () => {
    axios.post.mockResolvedValue({ data: {} });
    render(<CreateTask />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/título/i), 'Tarea importante');
    await user.type(screen.getByLabelText(/descripción/i), 'Detalles importantes');
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2023-12-31' } });
    
    await user.click(screen.getByRole('button', { name: /crear tarea/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/tareas'),
        {
          titulo: 'Tarea importante',
          descripcion: 'Detalles importantes',
          fecha: '2023-12-31',
          estado: 'Pendiente',
          estado_tarea: 'A',
          IDUsuario: 1
        }
      );
      expect(mockNavigate).toHaveBeenCalledWith('/tasklist');
    });
  });

  test('maneja errores al crear la tarea', async () => {
    axios.post.mockRejectedValue(new Error('Error de API'));
    render(<CreateTask />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/título/i), 'Tarea fallida');
    await user.click(screen.getByRole('button', { name: /crear tarea/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('redirige al hacer click en Volver', async () => {
    render(<CreateTask />);
    await userEvent.click(screen.getByRole('button', { name: /volver/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/tasklist');
  });

  test('muestra error si no hay usuario autenticado', async () => {
    localStorage.removeItem('token');
    jwtDecode.mockImplementation(() => { throw new Error('Token inválido') });
    
    render(<CreateTask />);
    const user = userEvent.setup();
    
    await user.click(screen.getByRole('button', { name: /crear tarea/i }));
    
    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
});