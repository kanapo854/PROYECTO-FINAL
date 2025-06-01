// src/setupTests.js
import '@testing-library/jest-dom';

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las implementaciones reales
  useNavigate: () => jest.fn(), // Mock específico para useNavigate
  Link: ({ children, to }) => <a href={to}>{children}</a>, // Mock simplificado de Link
}));

// Mock de axios si es necesario
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  // Añade otros métodos que uses
}));
