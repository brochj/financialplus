import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { AdMobBanner, } from 'expo-ads-admob';
import R from "res/R";

export default class Login extends React.Component {

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
                    <AdMobBanner
                        bannerSize="mediumRectangle"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id ca-app-pub-3940256099942544/6300978111
                        testDeviceID="EMULATOR"
                        onDidFailToReceiveAdWithError={this.bannerError} />

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