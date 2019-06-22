import React, { Component } from 'react';
import { StatusBar, Platform } from "react-native";
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Login from './../login/Login';
import Home from './Home';
import Results from './Results';
import R from 'res/R';

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const HomeTabNavigator = createStackNavigator({

    Home: {
        screen: Home
    },
    Login: {
        screen: Login,
    },
    Results: {
        screen: Results,
    }

}, {
    // initialRouteName: 'Results',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: R.colors.blackish,
              },
              headerTintColor: R.palette.lightTxt.color,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        },
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: R.colors.actionButton,
                // height: 40,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
            },
            style: {
                activeTintColor: R.palette.lightTxt.color,
                marginTop: statusBarHeight,
                height: 45,
                // backgroundColor: 'black',

            }

        },
    });

// container so eh necessario apenas quando se cria o StackNavigator na tela q starta o Aplicativo

export default HomeTabNavigator;