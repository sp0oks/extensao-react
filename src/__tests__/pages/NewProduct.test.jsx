import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, useNavigate } from 'react-router-dom';
import NewProduct from '../../pages/NewProduct';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NewProduct Form', () => {
  beforeEach(() => {
      mockNavigate.mockClear();
  });

  const routes = [
    {
      path: '/produtos/novo',
      element: <NewProduct />,
    },
  ];

  it('renders the form with all required fields and buttons', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/produtos/novo'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /cadastrar novo produto/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/foto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('calls navigate to "/produtos" when the cancel button is clicked', async () => {
      const user = userEvent.setup();
      const router = createMemoryRouter(routes, {
        initialEntries: ['/produtos/novo'],
      });

      render(<RouterProvider router={router} />);

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/produtos');
  });
});