import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const CryptoItem = ({ crypto, portfolio, handleInputChange }) => {
  return (
    <View style={styles.cryptoContainer}>
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
  );
};

const styles = StyleSheet.create({
    cryptoContainer: {
      marginBottom: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#fff',
      flex: 1,
      margin: 5,
      textAlign:'center'
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
  });


export default CryptoItem;
