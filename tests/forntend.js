import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import CryptoPrices from '..components/CryptoPrices.js'; 

jest.mock('axios');

const mockPrices = [
  {
    id: 1,
    name: 'VeChain',
    symbol: 'VET',
    quote: { USD: { price: 0.05, percent_change_24h: 1.2, market_cap: 3200000000, volume_24h: 150000000 } },
    slug: 'vechain',
  },
  {
    id: 2,
    name: 'Solana',
    symbol: 'SOL',
    quote: { USD: { price: 40, percent_change_24h: -2.3, market_cap: 11000000000, volume_24h: 500000000 } },
    slug: 'solana',
  },
  {
    id: 3,
    name: 'USD Coin',
    symbol: 'USDC',
    quote: { USD: { price: 1, percent_change_24h: 0.0, market_cap: 50000000000, volume_24h: 3000000000 } },
    slug: 'usd-coin',
  },
];

describe('<CryptoPrices />', () => {
  it('renders correctly and displays crypto prices', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPrices });

    const { getByText, getByPlaceholderText } = render(<CryptoPrices />);

    await waitFor(() => {
      expect(getByText('VeChain (VET)')).toBeTruthy();
      expect(getByText('$0.05')).toBeTruthy();
      expect(getByText('1.20%')).toBeTruthy();
    });

    const input = getByPlaceholderText('Amount of VET you own');
    fireEvent.changeText(input, '100');
    expect(input.props.value).toBe('100');
  });

  it('calculates total portfolio value correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPrices });

    const { getByText, getByPlaceholderText } = render(<CryptoPrices />);

    await waitFor(() => {
      const inputVET = getByPlaceholderText('Amount of VET you own');
      fireEvent.changeText(inputVET, '100');
      const inputSOL = getByPlaceholderText('Amount of SOL you own');
      fireEvent.changeText(inputSOL, '10');
      const inputUSDC = getByPlaceholderText('Amount of USDC you own');
      fireEvent.changeText(inputUSDC, '500');
    });

    fireEvent.press(getByText('Calculate Total Value'));

    await waitFor(() => {
      expect(getByText('Total Portfolio Value: $950.00')).toBeTruthy();
    });
  });
});
