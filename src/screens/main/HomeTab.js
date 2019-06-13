import React, { Component } from 'react';
import { StatusBar, Platform } from "react-native";
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import Login from './../login/Login';
import Home from './Home';
import R from 'res/R';

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