// components/CryptoPrices.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import CryptoItem from './CryptoItem';
import PortfolioTotal from './PortfolioTotal';

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState({ VET: '', SOL: '', USDC: '' });
  const [totalValue, setTotalValue] = useState(0);

  const fetchPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crypto-prices');
      setPrices(response.data);
      calculateTotalValue(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval); 
  }, []);

  const calculateTotalValue = (prices) => {
    const vetPrice = prices.find(crypto => crypto.symbol === 'VET').quote.USD.price;
    const solPrice = prices.find(crypto => crypto.symbol === 'SOL').quote.USD.price;
    const usdcPrice = prices.find(crypto => crypto.symbol === 'USDC').quote.USD.price;
    const total = (parseFloat(portfolio.VET) * vetPrice || 0) +
                  (parseFloat(portfolio.SOL) * solPrice || 0) +
                  (parseFloat(portfolio.USDC) * usdcPrice || 0);
    setTotalValue(total.toFixed(2));
  };

  const handleInputChange = (crypto, value) => {
    setPortfolio({
      ...portfolio,
      [crypto]: value
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPrices} />}
    >
      {prices.map((crypto) => (
        <CryptoItem
          key={crypto.id}
          crypto={crypto}
          portfolio={portfolio}
          handleInputChange={handleInputChange}
        />
      ))}
      <PortfolioTotal
        totalValue={totalValue}
        calculateTotalValue={calculateTotalValue}
        prices={prices}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
    },
    cryptoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    left: {
      marginRight: 10,
    },
    center: {
      flex: 1,
    },
    right: {
      marginLeft: 10,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
  });

export default CryptoPrices;
