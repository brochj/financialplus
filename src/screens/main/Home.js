import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import R from 'res/R';

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props)
        this.state = {
            capital: 0,
            periodo: 0,
            taxa: 0,
            montante: 0,
            juros: 0,


           
            resultado: 0,
            resutadoTxt: "",
        }
        this.jurosCompostos = this.jurosCompostos.bind(this);
        
    }




    jurosCompostos (){
        let s = this.state;
        s.capital = this.capitalField.getRawValue()
        s.taxa = this.taxaField.getRawValue()
        s.periodo = this.periodoField.getRawValue()
        if(s.capital !=0 && s.taxa !=0 && s.periodo !=0){// se for passado valores,
            s.montante = s.capital*Math.pow((1 + (s.taxa/100)),s.periodo);
		s.juros = s.montante - s.capital;	
        }
        this.setState(s);
		
    }
    
    updateValues = (maskedText, rawText) => {
        // let s = this.state;
        // s.capital = rawText;
        // this.setState(s);
    }
  
    render() {
        
        return (
            <View style={styles.container}>
                <Text style={[styles.txt, styles.resultTxt]}>{this.state.montante}</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputRow}>
                        <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.capital}</Text>
                        <TextInputMask
                            ref={(ref) => this.capitalField = ref}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            type={'money'}
                            options={{
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$ ',
                            }}
                            placeholder='$ 0.00'
                            value={this.state.capital}
                            includeRawValueInChangeText={true}
                            // onChangeText={(capital) => { this.setState({ capital }) }}
                            onChangeText={(v)=>this.jurosCompostos}
                            
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.taxa}</Text>
                        <TextInputMask
                            ref={(ref) => this.taxaField = ref}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            type={'money'}
                            options={{
                                separator: ',',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: ''
                            }}
                            placeholder='$ 0.00'
                            value={this.state.taxa}
                            onChangeText={(taxa) => { this.setState({ taxa }) }}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.periodo}</Text>
                        <TextInputMask
                            ref={(ref) => this.periodoField = ref}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            type={'money'}
                            options={{
                                precision: 0,
                                separator: ',',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: ''
                            }}
                            placeholder='$ 0.00'
                            value={this.state.periodo}
                            onChangeText={(periodo) => { this.setState({ periodo }) }}
                        />
                    </View>

                    <View style={styles.calcRow}>
                        <TouchableOpacity style={styles.touchOpacity} onPress={this.jurosCompostos}>
                            <Text style={[styles.txt, styles.txtButton]} >Calcular</Text>
                        </TouchableOpacity>
                    </View>





                </View>

                {/* <Button style={styles.txtButton} onPress={this.calcular} title='Calcular' /> */}
                <View style={styles.resultRow}>
                    <Text style={[styles.txt, styles.resultTxt]}>{this.state.montante}</Text>
                    <Text style={[styles.resultTxt, { fontSize: 20 }]}>{this.state.capital}</Text>
                    <Text style={[styles.resultTxt, { fontSize: 20 }]}>{this.state.taxa}</Text>
                    <Text style={[styles.resultTxt, { fontSize: 20 }]}>{this.state.periodo}</Text>
                </View>






            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
    },

    inputContainer: {
        flex: 1,

    },

    inputRow: {
        // backgroundColor: '#2b4141',
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        // height: '15%',
        height: 50,
    },

    calcRow: {
        // backgroundColor: '#2b4141',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        justifyContent: 'center',
    },


    txt: {
        color: '#edf2f4',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        //fontWeight: '500',
        letterSpacing: 1,

    },

    txtLabel: {
        width: '30%',
        backgroundColor: '#2b4141',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },

    textInput: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#edf2f4',
        width: '70%',
        letterSpacing: 1,
    },

    resultRow: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },

    txtButton: {
        color: '#2b4141',
    },

    touchOpacity: {
        borderRadius: 3,
        backgroundColor: '#48e5c2',
        padding: 15,
    },


    resultTxt: {
        color: '#2b4141'

    },
});
