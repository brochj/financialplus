import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'Configurações',
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