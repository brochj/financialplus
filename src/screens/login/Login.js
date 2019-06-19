import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import R from "res/R";

export default class Login extends React.Component {

    static navigationOptions = {
        title: R.strings.home.configuracoes,
    };

    render() {
        return (
            <View>
                <Text>Login</Text>
                
                <Button title="Entrar"
                // Essa Tela 2, é a chave definida na linha 14 de App.js
                    onPress={() => { this.props.navigation.navigate('HomeTab'); }} /> 
            </View>


        );
    }
}