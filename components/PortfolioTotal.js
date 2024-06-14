// components/PortfolioTotal.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PortfolioTotal = ({ totalValue, calculateTotalValue, prices }) => {
  return (
    <View style={styles.totalContainer}>
      <Button title="Calculate Total Value" onPress={() => calculateTotalValue(prices)} />
      <Text style={styles.totalValue}>Total Portfolio Value: ${totalValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    totalContainer: {
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 20,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  
export default PortfolioTotal;
