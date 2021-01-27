import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Provider } from 'react-redux';

import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import store from './src/store/index';

import Routes from './src/routes';

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <View style={styles.container} >
          <Routes />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
