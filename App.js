
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import First from './First';
import Second from './Second';


const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Liste Pokemon" component={First} />
          <Stack.Screen name="Détails" component={Second} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default  App;