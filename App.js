import React from 'react';
import { createAppContainer, createDrawerNavigator , DrawerItems} from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, KeyboardAvoidingView, Button, ProgressBarAndroid, TextInput, SafeAreaView, Image, Dimensions } from "react-native";

import HomeTab from './src/screens/main/HomeTab';
import Login from './src/screens/login/Login';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import R from 'res/R';
const {width} = Dimensions.get('window');
const iconSize = 25;
const drawerStyles = {
    container: {
        flex: 1,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        heigth: 150, 
        backgroundColor: 'white'
    }
};

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={drawerStyles.container}>
        <View style={drawerStyles.imageView}>
           <Image source={require('./assets/icon.orig.png')} style={{height: 100, width:100,borderRadius: 50}}/>   
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>

)
const AppNavigator = createDrawerNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            title: R.strings.home.jurosCompostos,
            drawerIcon: ({tintColor}) =>(
                <MaterialIcons
                    name="home"
                    size={iconSize}
                    color={tintColor}
                    style={{ width: iconSize }}
                />
            ),
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: R.strings.home.configuracoes,
            drawerIcon: ({tintColor}) =>(
                <MaterialIcons
                    name="settings"
                    size={iconSize}
                    color={tintColor}
                    style={{ width: iconSize }}
                />
            ),
        },
    }

}, {
        contentComponent: CustomDrawerComponent,
        // drawerBackgroundColor: 'red',
        drawerWidth: width*.75,
        contentOptions: {
            activeTintColor: R.palette.lightTxt.color,
            activeBackgroundColor: R.palette.darkTxt.color,
                    labelStyle: {
                        fontSize: 15,
                    },
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