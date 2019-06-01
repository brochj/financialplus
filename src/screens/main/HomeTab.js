import React, { Component } from 'react';
import { StatusBar, Platform } from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation';
import Login from './../login/Login';
import Home from './Home';

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const HomeTabNavigator = createMaterialTopTabNavigator({

    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },

}, {
        tabBarOptions: {
            style: {
                marginTop: statusBarHeight,
                height: 45
            }
        }
    });

// container so eh necessario apenas quando se cria o StackNavigator na tela q starta o Aplicativo

export default HomeTabNavigator;