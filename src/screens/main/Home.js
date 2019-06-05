import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { TextInputMask, MaskService } from "react-native-masked-text";
import R from 'res/R';

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
        
    };

    constructor(props) {
        super(props)
        this.state = {
            capital: 100,
            periodo: 12,
            taxa: 10,
            lastTaxa: 0,
            taxaMensal: 0,
            taxaAnual: 0,
            montante: '0',
            montanteTxt: '',
            juros: 0,

            isTaxaAnual: false,
            isTaxaMensal: true,
            isPeriodoAnual: false,
            isPeriodoMensal: true,


            resultado: 0,
            resutadoTxt: "",
        }
        this.jurosCompostos = this.jurosCompostos.bind(this);
        this.setPeriodoTipo = this.setPeriodoTipo.bind(this);
        this.maskNumber = this.maskNumber.bind(this);

    }
    setPeriodoTipo(tipo) {
        let s = this.state;
        if (tipo == 'isTaxaMensal') {
            s.isTaxaMensal = true;
            s.isTaxaAnual = false;
        } else if (tipo == 'isTaxaAnual') {
            s.isTaxaMensal = false;
            s.isTaxaAnual = true;
        }
        if (tipo == 'isPeriodoMensal') {
            s.isPeriodoMensal = true;
            s.isPeriodoAnual = false;
        } else if (tipo == 'isPeriodoAnual') {
            s.isPeriodoMensal = false;
            s.isPeriodoAnual = true;
        }
        this.setState(s);
        this.jurosCompostos();
    }

    maskNumber(num) {
        let maskedNum = MaskService.toMask('money', num, {
            unit: '$',
            separator: ',',
            delimiter: '.'
        })
        return(maskedNum);
    }
    jurosCompostos() {
        let s = this.state;

        if (this.state.isPeriodoAnual && this.state.isTaxaMensal) {
            if (s.capital != 0 && s.taxa != 0 && s.periodo != 0) {// se for passado valores,
                s.montante = s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo * 12);
                s.juros = s.montante - s.capital;
            }
        } else if (this.state.isPeriodoMensal && this.state.isTaxaAnual) {

            if (s.capital != 0 && s.taxa != 0 && s.periodo != 0) {// se for passado valores,
                s.montante = s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo / 12);
                s.juros = s.montante - s.capital;
            }
        } else if ((this.state.isPeriodoAnual && this.state.isTaxaAnual) ||
            (this.state.isPeriodoMensal && this.state.isTaxaMensal)) {

            if (s.capital != 0 && s.taxa != 0 && s.periodo != 0) {// se for passado valores,
                s.montante = s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo);
                s.juros = s.montante - s.capital;
            }
        }
        this.setState(s);

    }
    updateCapital = (maskedText, rawText) => {
        let s = this.state;
        s.capital = rawText;
        this.setState(s);
        this.jurosCompostos();
    }
    updateTaxa = (maskedText, rawText) => {
        let s = this.state;
        s.taxa = rawText;
        this.setState(s);
        this.jurosCompostos();
    }
    updatePeriodo = (maskedText, rawText) => {
        let s = this.state;
        s.periodo = rawText;
        this.setState(s);
        this.jurosCompostos();
    }

    render() {

        const switchStyles = {
            switch: {
                flex: 1,
                flexDirection: 'row',
                marginLeft: -140,
                zIndex: 1,
            },
            Touch: {
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                // borderRadius: 20,
                minWidth: 70,
            },
            txt: {
                color: '#edf2f4',
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 18,
                letterSpacing: 1,
            },
            taxaMensalBg: {
                backgroundColor: this.state.isTaxaMensal ? R.colors.actionButton : R.colors.blueish[50],
            },
            taxaMensalTxt: {
                fontSize: 14,
                color: this.state.isTaxaMensal ? R.colors.txt : R.colors.blueish[700],
            },
            taxaAnualBg: {
                backgroundColor: this.state.isTaxaAnual ? R.colors.actionButton : R.colors.blueish[50],
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            taxaAnualTxt: {
                fontSize: 14,
                color: this.state.isTaxaAnual ? R.colors.txt : R.colors.blueish[700],
            },
            periodoMensalBg: {
                backgroundColor: this.state.isPeriodoMensal ? R.colors.actionButton : R.colors.blueish[50],
            },
            periodoMensalTxt: {
                fontSize: 14,
                color: this.state.isPeriodoMensal ? R.colors.txt : R.colors.blueish[700],
            },
            periodoAnualBg: {
                backgroundColor: this.state.isPeriodoAnual ? R.colors.actionButton : R.colors.blueish[50],
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            periodoAnualTxt: {
                fontSize: 14,
                color: this.state.isPeriodoAnual ? R.colors.txt : R.colors.blueish[700],
            }
        }

        return (
            <View style={styles.container}>
                <Text style={[styles.txt, { color: 'black' }]}>{this.maskNumber(this.state.montante)}</Text>

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
                            onChangeText={this.updateCapital}

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
                            includeRawValueInChangeText={true}
                            onChangeText={this.updateTaxa}
                        />

                        <View style={switchStyles.switch}>
                            <TouchableOpacity
                                style={[switchStyles.Touch, switchStyles.taxaMensalBg]}
                                onPress={() => this.setPeriodoTipo('isTaxaMensal')}>
                                <Text style={[switchStyles.txt, switchStyles.taxaMensalTxt]} >Mensal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[switchStyles.Touch, switchStyles.taxaAnualBg]}
                                onPress={() => this.setPeriodoTipo('isTaxaAnual')}>
                                <Text style={[switchStyles.txt, switchStyles.taxaAnualTxt]} >Anual</Text>
                            </TouchableOpacity>
                        </View>
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
                            includeRawValueInChangeText={true}
                            onChangeText={this.updatePeriodo}
                        />

                        <View style={switchStyles.switch}>
                            <TouchableOpacity
                                style={[switchStyles.Touch, switchStyles.periodoMensalBg]}
                                onPress={() => this.setPeriodoTipo('isPeriodoMensal')}>
                                <Text style={[switchStyles.txt, switchStyles.periodoMensalTxt]} >Meses</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[switchStyles.Touch, switchStyles.periodoAnualBg]}
                                onPress={() => this.setPeriodoTipo('isPeriodoAnual')}>
                                <Text style={[switchStyles.txt, switchStyles.periodoAnualTxt]} >Anos</Text>
                            </TouchableOpacity>
                        </View>
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
        ...R.palette.input,
        width: '70%',
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
        ...R.palette.actionButton,
    },
    switchtaxaMensal: {
        ...R.palette.actionButton,
    },

    resultTxt: {
        ...R.palette.lightTxt,

    },


});
