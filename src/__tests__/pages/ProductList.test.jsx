import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLoaderData } from 'react-router-dom';
import Papa from 'papaparse';

import ProductList from '../../pages/ProductList';
import apiClient from '../../api/apiClient';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));
jest.mock('../../api/apiClient');
jest.mock('papaparse');

global.alert = jest.fn();

const mockProducts = [
  {
    code: '123',
    name: 'Smartphone Samsung Galaxy S24 FE 128GB Grafite 5G 8GB RAM 6,7" Câm. Tripla + Selfie 10MP',
    description: 'O Galaxy S24 FE Grafite 5G é o smartphone da Samsung...',
    price: 2498,
    category: 'Celulares e Smartphones',
    pictureUrl: 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-s24-fe-128gb-grafite-5g-8gb-ram-67-cam-tripla-selfie-10mp/magazineluiza/240010800/cb7f1ca382009d6cca85a254ca69a9ae.jpg',
  },
  {
    code: '134',
    name: 'Smartphone Samsung Galaxy A56 5G Preto 128GB, 8GB RAM, Câmera Tripla até 50MP, Tela Super AMOLED 6.7", IP67, NFC, Vídeo HDR e Recursos AI',
    description: 'Apresentando o Galaxy A56 5G...',
    price: 1834,
    category: 'Celulares e Smartphones',
    pictureUrl: 'https://imgs.casasbahia.com.br/55068951/1g.jpg',
  },
  {
    code: '135',
    name: 'Smartphone Samsung Galaxy A25 6,5" 256GB Azul Escuro 5G 8GB RAM Câm Tripla 50MP + Selfie 13MP Bateria 5000mAh Dual Chip',
    description: 'O Samsung Galaxy A25 na cor azul escuro...',
    price: 1349.1,
    category: 'Celulares e Smartphones',
    pictureUrl: 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a25-65-256gb-azul-escuro-5g-8gb-ram-cam-tripla-50mp-selfie-13mp-bateria-5000mah-dual-chip/magazineluiza/237215300/f506e35216a23119cb33d1f278f08c56.jpg',
  },
  {
    code: '141',
    name: 'Smartphone Motorola Moto g55 5G Preto 256GB, 8GB RAM + 8GB RAM Boost, Câmera Traseira de até 50MP com AI, NFC e Tela 6.5" com Superbrilho',
    description: "Com a câmera principal de 50MP e estabilização óptica (OIS), o Moto G55 5G...",
    price: 1266,
    category: 'Celulares e Smartphones',
    pictureUrl: 'https://imgs.casasbahia.com.br/55068804/1g.jpg',
  },
];

describe('ProductList', () => {
  beforeEach(() => {
    useLoaderData.mockReturnValue([...mockProducts]);
    jest.clearAllMocks();
  });

  it('Displays product list correctly', async () => {
    render(<ProductList />);

    const productImages = await screen.findAllByRole('img');
    expect(productImages).toHaveLength(4);

    const productTitles = await screen.findAllByRole('heading', { level: 2 });
    expect(productTitles).toHaveLength(4);
    expect(productTitles[0].textContent).toBe('(123) Smartphone Samsung Galaxy S24 FE 128GB Grafite 5G 8GB RAM 6,7" Câm. Tripla + Selfie 10MP');
    expect(productTitles[1].textContent).toBe('(134) Smartphone Samsung Galaxy A56 5G Preto 128GB, 8GB RAM, Câmera Tripla até 50MP, Tela Super AMOLED 6.7", IP67, NFC, Vídeo HDR e Recursos AI');
    expect(productTitles[2].textContent).toBe('(135) Smartphone Samsung Galaxy A25 6,5" 256GB Azul Escuro 5G 8GB RAM Câm Tripla 50MP + Selfie 13MP Bateria 5000mAh Dual Chip');
    expect(productTitles[3].textContent).toBe('(141) Smartphone Motorola Moto g55 5G Preto 256GB, 8GB RAM + 8GB RAM Boost, Câmera Traseira de até 50MP com AI, NFC e Tela 6.5" com Superbrilho');
  });

  it('Filters product list accordingly', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ProductList />);

    const input = screen.getByPlaceholderText('Filtrar por código...');
    await user.type(input, '13');

    act(() => {
      jest.runAllTimers();
    });

    const productImages = screen.getAllByRole('img');
    expect(productImages).toHaveLength(2);
    
    const productTitles = screen.getAllByRole('heading', { level: 2 });
    expect(productTitles).toHaveLength(2);
    expect(productTitles[0].textContent).toBe('(134) Smartphone Samsung Galaxy A56 5G Preto 128GB, 8GB RAM, Câmera Tripla até 50MP, Tela Super AMOLED 6.7", IP67, NFC, Vídeo HDR e Recursos AI');
    expect(productTitles[1].textContent).toBe('(135) Smartphone Samsung Galaxy A25 6,5" 256GB Azul Escuro 5G 8GB RAM Câm Tripla 50MP + Selfie 13MP Bateria 5000mAh Dual Chip');

    jest.useRealTimers();
  });

  it('handles invalid file type selection', () => {
    render(<ProductList />);

    const fileInput = screen.getByLabelText(/arquivo csv/i);
    const badFile = new File(['hello'], 'hello.txt', { type: 'text/plain' });

    Object.defineProperty(fileInput, 'files', {
      value: [badFile],
    });

    fireEvent.change(fileInput);
    
    expect(global.alert).toHaveBeenCalledWith('Extensão de arquivo inválida');
  });

  it('parses valid CSV, and updates main list after successful upload', async () => {
      const user = userEvent.setup();
      
      const apiResponse = { id: 999, name: 'New CSV Product', price: 100, pictureUrl: 'https://example.com/image.jpg' };
      apiClient.post.mockResolvedValue({ data: apiResponse });

      const mockParsedData = [
          { name: 'New CSV Product', price: '100', pictureUrl: 'https://example.com/image.jpg' },
      ];
      Papa.parse.mockImplementation((file, config) => {
          config.complete({ data: mockParsedData });
      });
      
      render(<ProductList />);

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      const fileInput = screen.getByLabelText(/arquivo csv/i);
      const goodFile = new File(['name,price\nNew CSV Product,100'], 'products.csv', { type: 'text/csv' });
      
      await user.upload(fileInput, goodFile);
      
      const previewCard = await screen.findByRole('heading', { name: /\(csv-0\) New CSV Product/i });
      expect(previewCard).toBeInTheDocument();

      const checkbox = await screen.findByLabelText(/incluir/i);
      await user.click(checkbox);
      await user.click(submitButton);

      expect(await screen.findByText('Criado com sucesso!')).toBeInTheDocument();

      const mainListHeading = await screen.findByRole('heading', { name: /\(999\) New CSV Product/i });
      expect(mainListHeading).toBeInTheDocument();
      
      const allProductCards = screen.getAllByRole('button', { name: /editar/i });
      expect(allProductCards).toHaveLength(mockProducts.length + 1);
  });
});
