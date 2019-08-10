import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import R from "res/R";

export default class Config extends React.Component {

    static navigationOptions = {
        title: R.strings.home.configuracoes,
    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>Em Desenvolvimento</Text>

                </View>

                <View style={styles.adBannerView}>
                    

                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    adBannerView: {
        alignItems: 'center',
        backgroundColor: '#fff'
    }


});