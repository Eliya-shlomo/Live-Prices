import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PortfolioTotal = ({ totalValue, calculateTotalValue, prices }) => {
  return (
    <View style={styles.totalContainer}>
      <Button title="Calculate Total Value" color="#bc6c25"  onPress={() => calculateTotalValue(prices)} />
      <Text style={styles.totalValue}>Total Portfolio Value: ${totalValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    totalContainer: {
      padding: 15,
      borderWidth: 1,
      borderColor: '#d4a373',
      borderRadius: 10,
      backgroundColor: '#faedcd',
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
