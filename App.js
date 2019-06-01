import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeTab from './src/screens/main/HomeTab';


const AppNavigator = createStackNavigator({
  HomeTab: {
    screen: HomeTab,
  },

}, {
    defaultNavigationOptions: {
      header: null,
    }
  }
);


export default createAppContainer(AppNavigator);