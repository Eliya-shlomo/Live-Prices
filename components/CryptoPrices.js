// components/CryptoPrices.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, Button, RefreshControl } from 'react-native';
import axios from 'axios';

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
        <View key={crypto.id} style={styles.cryptoContainer}>
          <Text style={styles.name}>{crypto.name} ({crypto.symbol})</Text>
          <Text style={styles.price}>${crypto.quote.USD.price.toFixed(2)}</Text>
          <Text style={styles.change}>
            {crypto.quote.USD.percent_change_24h.toFixed(2)}%
          </Text>
          <Text style={styles.details}>
            Market Cap: ${crypto.quote.USD.market_cap.toLocaleString()}
          </Text>
          <Text style={styles.details}>
            Volume (24h): ${crypto.quote.USD.volume_24h.toLocaleString()}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={`Amount of ${crypto.symbol} you own`}
            keyboardType="numeric"
            value={portfolio[crypto.symbol]}
            onChangeText={(value) => handleInputChange(crypto.symbol, value)}
          />
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Button title="Calculate Total Value" onPress={() => calculateTotalValue(prices)} />
        <Text style={styles.totalValue}>Total Portfolio Value: ${totalValue}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cryptoContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#00b894',
  },
  change: {
    fontSize: 14,
    color: '#d63031',
  },
  details: {
    fontSize: 12,
    color: '#636e72',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CryptoPrices;
