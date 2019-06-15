import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import HomeTab from './src/screens/main/HomeTab';
import Login from './src/screens/login/Login';


const AppNavigator = createDrawerNavigator({
  HomeTab: {
    screen: HomeTab,
    navigationOptions: {
      title: `Juros Compostos`,
    },
  },
  Login: {
    screen: Login
  }

}, {
    // drawerBackgroundColor: 'red',
    drawerWidth: 300,
    contentOptions: {
      activeTintColor: 'red',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    defaultNavigationOptions: {
      header: null,

    }
  }
);


export default createAppContainer(AppNavigator);