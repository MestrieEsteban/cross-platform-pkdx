
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import First from './liste';
import Second from './details';
import Inscription from './Inscription';
import profil from './profil';
import google from './searchGoogle';
console.disableYellowBox = true; 


const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Liste Pokemon" component={First} />
          <Stack.Screen name="Détails" component={Second} />
          <Stack.Screen name="Connexion / Inscription" component={Inscription} />
          <Stack.Screen name="Profil" component={profil} />
          <Stack.Screen name="Recherche Google" component={google} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default  App;