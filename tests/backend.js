import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CryptoPrices from '../CryptoPrices';

const mock = new MockAdapter(axios);

describe('CryptoPrices Component', () => {
  it('renders loading state initially', () => {
    const { getByTestId } = render(<CryptoPrices />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('fetches and displays crypto prices', async () => {
    mock.onGet('http://localhost:5000/api/crypto-prices').reply(200, [
      { id: 1, name: 'VeChain', symbol: 'VET', quote: { USD: { price: 0.123, percent_change_24h: 2.34, market_cap: 123456789, volume_24h: 987654321 } }, slug: 'vechain' },
      { id: 2, name: 'Solana', symbol: 'SOL', quote: { USD: { price: 40.567, percent_change_24h: -1.23, market_cap: 987654321, volume_24h: 123456789 } }, slug: 'solana' },
      { id: 3, name: 'USD Coin', symbol: 'USDC', quote: { USD: { price: 1.00, percent_change_24h: 0.01, market_cap: 456789123, volume_24h: 123789456 } }, slug: 'usd-coin' },
    ]);

    const { getByText } = render(<CryptoPrices />);

    await waitFor(() => expect(getByText('VeChain (VET)')).toBeTruthy());
    expect(getByText('Solana (SOL)')).toBeTruthy();
    expect(getByText('USD Coin (USDC)')).toBeTruthy();
  });

  it('handles API errors gracefully', async () => {
    mock.onGet('http://localhost:5000/api/crypto-prices').reply(500, { error: 'Internal Server Error' });

    const { getByText } = render(<CryptoPrices />);

    await waitFor(() => expect(getByText(/Internal Server Error/i)).toBeTruthy());
  });

  it('calculates total portfolio value', async () => {
    mock.onGet('http://localhost:5000/api/crypto-prices').reply(200, [
      { id: 1, name: 'VeChain', symbol: 'VET', quote: { USD: { price: 0.123, percent_change_24h: 2.34, market_cap: 123456789, volume_24h: 987654321 } }, slug: 'vechain' },
      { id: 2, name: 'Solana', symbol: 'SOL', quote: { USD: { price: 40.567, percent_change_24h: -1.23, market_cap: 987654321, volume_24h: 123456789 } }, slug: 'solana' },
      { id: 3, name: 'USD Coin', symbol: 'USDC', quote: { USD: { price: 1.00, percent_change_24h: 0.01, market_cap: 456789123, volume_24h: 123789456 } }, slug: 'usd-coin' },
    ]);

    const { getByPlaceholderText, getByText } = render(<CryptoPrices />);

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Amount of VET you own'), '100');
      fireEvent.changeText(getByPlaceholderText('Amount of SOL you own'), '2');
      fireEvent.changeText(getByPlaceholderText('Amount of USDC you own'), '50');
    });

    fireEvent.press(getByText('Calculate Total Value'));

    await waitFor(() => {
      expect(getByText(/Total Portfolio Value: \$102.23/i)).toBeTruthy();
    });
  });
});
