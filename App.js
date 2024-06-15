import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CryptoPrices from './components/CryptoPrices';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CryptoPrices />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '264653',
    textAlign:'center'
  },
});
