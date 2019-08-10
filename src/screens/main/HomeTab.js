import React, { Component, useContext } from 'react';
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from 'react-navigation';
import Config from 'screens/Config/Config';
import Home from 'screens/main/Home';
import Results from 'screens/main/Results';
import R from 'res/R';
import {theme} from "res/themeContext";

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default HomeTabNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Config: {
        screen: Config,
    },
    Results: {
        screen: Results,
    }

}, {
        // initialRouteName: 'Results',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.primary,
            },
            headerTintColor: theme.onPrimary,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });
