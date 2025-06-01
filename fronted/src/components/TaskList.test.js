import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Tasks from './TaskList';

// Mock completo de axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    defaults: {
      withCredentials: true
    },
    get: jest.fn(),
    delete: jest.fn()
  }
}));

// Mock de localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Prueba básica del componente Tasks', () => {
  const mockTasks = [
    {
      IDTarea: 1,
      titulo: 'Tarea de prueba',
      descripcion: 'Esta es una tarea de prueba',
      fecha: '2023-01-01',
      estado: 'Pendiente'
    },
    {
      IDTarea: 2,
      titulo: 'Otra tarea',
      descripcion: 'Descripción diferente',
      fecha: '2023-01-02',
      estado: 'Completada'
    }
  ];

  beforeEach(() => {
    // Configurar localStorage
    window.localStorage.setItem('token', 'mock-token');
    window.localStorage.setItem('user', JSON.stringify({
      IDUsuario: 1,
      email: 'test@example.com'
    }));
    
    // Configurar mock de axios
    axios.get.mockResolvedValue({ data: mockTasks });
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  test('Muestra las tareas correctamente', async () => {
    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );

    // Verificar que la tarea se muestra después de cargar
    const tarea = await screen.findByText('TAREA DE PRUEBA');
    
    // Usar within para buscar dentro de la tarjeta específica
    const tarjetaTarea = tarea.closest('li');
    
    expect(within(tarjetaTarea).getByText('Esta es una tarea de prueba')).toBeInTheDocument();
    expect(within(tarjetaTarea).getByText('Pendiente')).toBeInTheDocument();
  });

  test('Filtra tareas por título', async () => {
    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );

    // Esperar a que carguen las tareas
    await screen.findByText('TAREA DE PRUEBA');

    // Filtrar por título
    const filtroTitulo = screen.getByPlaceholderText('Filtrar por título');
    fireEvent.change(filtroTitulo, { target: { value: 'prueba' } });

    // Verificar que la tarea correcta sigue visible
    expect(screen.getByText('TAREA DE PRUEBA')).toBeInTheDocument();
    // Verificar que la otra tarea no está visible
    expect(screen.queryByText('OTRA TAREA')).not.toBeInTheDocument();
  });

  test('Muestra botones para tareas no completadas', async () => {
    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );

    // Esperar a que carguen las tareas
    await screen.findByText('TAREA DE PRUEBA');
    
    // Encontrar la tarjeta de la tarea pendiente
    const tareaPendiente = screen.getByText('TAREA DE PRUEBA').closest('li');
    
    // Verificar que los botones están presentes solo en tareas no completadas
    expect(within(tareaPendiente).getByText('Actualizar tarea')).toBeInTheDocument();
    expect(within(tareaPendiente).getByText('Eliminar tarea')).toBeInTheDocument();
    
    // Verificar que en la tarea completada no están los botones
    const tareaCompletada = screen.getByText('OTRA TAREA').closest('li');
    expect(within(tareaCompletada).queryByText('Actualizar tarea')).not.toBeInTheDocument();
    expect(within(tareaCompletada).queryByText('Eliminar tarea')).not.toBeInTheDocument();
  });
});