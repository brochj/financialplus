import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, KeyboardAvoidingView, Button, ProgressBarAndroid, TextInput, Dimensions } from "react-native";
import { TextInputMask, MaskService } from "react-native-masked-text";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from "res/themeContext";

import R from 'res/R';

console.disableYellowBox = true;

export default class Home extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: R.strings.home.jurosCompostos,
            // header: null,
            headerRight: (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="trending-up"
                        size={28}
                        onPress={navigation.getParam('goToResults')}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <MaterialIcons
                        name="menu"
                        size={35}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                </View>


            ),
        };
    };
    componentDidMount() {
        this.props.navigation.setParams({ goToResults: this._goToResults });
    }

    _goToResults = () => {
        let s = this.state;
        this.props.navigation.navigate('Results',
            {
                capital: s.capital,
                aportes: s.aportes,
                periodo: s.periodo,
                taxa: s.taxa,

                isTaxaAnual: s.isTaxaAnual,
                isTaxaMensal: s.isTaxaMensal,
                isPeriodoAnual: s.isPeriodoAnual,
                isPeriodoMensal: s.isPeriodoMensal,
            }
        );
    };

    constructor(props) {
        super(props)
        this.state = {
            capital: 100,
            aportes: 0,
            capital_inv: 0,
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
            relatorioData: [],
            Progress_Value: 0.00,
        }
        this.jurosCompostos = this.jurosCompostos.bind(this);
        this.setPeriodoTipo = this.setPeriodoTipo.bind(this);
        this.maskNumber = this.maskNumber.bind(this);
        this.relatorio = this.relatorio.bind(this);
        this.flatRender = this.flatRender.bind(this);
        this.mensalToAnual = this.mensalToAnual.bind(this);
        this.mesesToAnos = this.mesesToAnos.bind(this);




    }

    relatorio() {
        function insertValues(index) {
            s.juros = s.montante - s.capital;
            s.relatorioData.push({
                key: index.toString(),
                montante: s.montante,
                juros: s.juros,
            });
        }
        let s = this.state;
        if ((s.capital != 0 || s.aportes != 0) && s.taxa != 0 && s.periodo != 0) {
            s.relatorioData = [];
            s.montante = 0;

            if (this.state.isPeriodoAnual && this.state.isTaxaMensal) {
                for (let i = 1; i <= s.periodo * 12; i++) {
                    if (s.montante == 0) {
                        s.montante = s.capital * (1 + s.taxa / 100);
                        insertValues(i);
                    } else {
                        s.montante = s.montante * (1 + s.taxa / 100);
                        insertValues(i);
                    }
                }
            } else if (this.state.isPeriodoMensal && this.state.isTaxaAnual) {
                for (let i = 1; i <= s.periodo / 12; i++) {
                    if (s.montante == 0) {
                        s.montante = s.capital * (1 + s.taxa / 100);
                        insertValues(i);
                    } else {
                        s.montante = s.montante * (1 + s.taxa / 100);
                        insertValues(i);
                    }
                }
            } else if ((this.state.isPeriodoAnual && this.state.isTaxaAnual) ||
                (this.state.isPeriodoMensal && this.state.isTaxaMensal)) {
                for (let i = 1; i <= s.periodo; i++) {
                    if (s.montante == 0) {
                        s.montante = s.capital * (1 + s.taxa / 100);
                        insertValues(i);
                    } else {
                        s.montante = s.montante * (1 + s.taxa / 100);
                        insertValues(i);
                    }
                }
            }
        }
        this.setState(s);
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
        this.Stop_Progress();
        this.jurosCompostos();
    }

    maskNumber(num) {
        let numString = num.toString().indexOf('.');
        if (numString < 13) {
            let maskedNum = MaskService.toMask('money', num, {
                unit: '$ ',
                separator: ',',
                delimiter: '.'
            })
            return (maskedNum);
        } else {
            return R.strings.home.rich;
        }
    }
    jurosCompostos() {
        let s = this.state;
        function calculaJuros() {

            s.montante = (s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo)) + s.aportes * (1 + (s.taxa / 100)) * ((Math.pow(1 + (s.taxa / 100), s.periodo) - 1) / (s.taxa / 100));
            s.capital_inv = s.capital + s.aportes * s.periodo;
            s.juros = s.montante - s.capital_inv;
        }
        if ((s.capital != 0 || s.aportes != 0) && s.taxa != 0 && s.periodo != 0) {// se for passado valores,
            if (this.state.isPeriodoAnual && this.state.isTaxaMensal) {
                s.montante = (s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo * 12)) + s.aportes * (1 + (s.taxa / 100)) * ((Math.pow(1 + (s.taxa / 100), s.periodo * 12) - 1) / (s.taxa / 100));
                s.capital_inv = s.capital + s.aportes * s.periodo * 12;
                s.juros = s.montante - s.capital_inv;

            } else if (this.state.isPeriodoMensal && this.state.isTaxaAnual) {
                s.montante = (s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo / 12)) + s.aportes * 12 * (1 + (s.taxa / 100)) * ((Math.pow(1 + (s.taxa / 100), s.periodo / 12) - 1) / (s.taxa / 100));
                s.capital_inv = s.capital + s.aportes * s.periodo;
                s.juros = s.montante - s.capital_inv;

            } else if (this.state.isPeriodoAnual && this.state.isTaxaAnual) {
                s.montante = (s.capital * Math.pow((1 + (s.taxa / 100)), s.periodo)) + s.aportes * 12 * (1 + (s.taxa / 100)) * ((Math.pow(1 + (s.taxa / 100), s.periodo) - 1) / (s.taxa / 100));
                s.capital_inv = s.capital + s.aportes * 12 * s.periodo;
                s.juros = s.montante - s.capital_inv;
            } else if (this.state.isPeriodoMensal && this.state.isTaxaMensal) {
                calculaJuros();

            }


        }
        this.setState(s);

    }
    mensalToAnual() {
        let s = this.state;
        if (s.isTaxaAnual) {
            s.taxa = (Math.pow(1 + (s.taxa / 100), 1 / 12) - 1) * 100;
            s.isTaxaAnual = false;
            s.isTaxaMensal = true;
        } else if (s.isTaxaMensal) {
            s.taxa = (Math.pow(1 + (s.taxa / 100), 12) - 1) * 100;
            s.isTaxaAnual = true;
            s.isTaxaMensal = false;
        }
        this.setState(s);
    }
    mesesToAnos() {
        let s = this.state;
        if (s.isPeriodoAnual) {
            s.periodo *= 12;
            s.isPeriodoAnual = false;
            s.isPeriodoMensal = true;
        } else if (s.isPeriodoMensal) {
            s.periodo /= 12;
            s.isPeriodoAnual = true;
            s.isPeriodoMensal = false;
        }
        this.setState(s);
    }
    updateCapital = (maskedText, rawText) => {
        let s = this.state;
        s.capital = rawText;
        this.setState(s);
        this.jurosCompostos();
    }
    updateAportes = (maskedText, rawText) => {
        let s = this.state;
        s.aportes = rawText;
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
    Start_Progress = () => {
        this.value = setInterval(() => {
            if (this.state.Progress_Value <= 1) {
                let s = this.state;
                s.Progress_Value += .12
                this.setState(s);
            }
        }, 50);
    }
    Stop_Progress = () => {
        clearInterval(this.value);
        this.Clear_Progress();
    }
    Clear_Progress = () => {
        let s = this.state;
        s.Progress_Value = 0.0;
        this.setState(s);
    }
    flatRender(item, index) {
        return (
            <View style={styles.flatItem}>
                {this.state.isTaxaMensal ?
                    <Text >{R.strings.home.mes}: {item.key}</Text> :
                    <Text >{R.strings.home.ano}: {item.key}</Text>}
                <Text >Juros total: {this.maskNumber(item.juros)}</Text>
                <Text>Montante: {this.maskNumber(item.montante)}</Text>
            </View>
        );
    }
    bannerError = () => {
        // alert('erro') 
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
                minWidth: 70,
            },
            txt: {
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 18,
                letterSpacing: 1,
            },
            taxaMensalBg: {
                backgroundColor: this.state.isTaxaMensal ? theme.primaryVariant : theme.input,
            },
            taxaMensalTxt: {
                fontSize: 14,
                color: this.state.isTaxaMensal ? theme.onPrimary : theme.onInput,
            },
            taxaAnualBg: {
                backgroundColor: this.state.isTaxaAnual ? theme.primaryVariant : theme.input,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            taxaAnualTxt: {
                fontSize: 14,
                color: this.state.isTaxaAnual ? theme.onPrimary : theme.onInput,
            },
            periodoMensalBg: {
                backgroundColor: this.state.isPeriodoMensal ? theme.primaryVariant : theme.input,
            },
            periodoMensalTxt: {
                fontSize: 14,
                color: this.state.isPeriodoMensal ? theme.onPrimary : theme.onInput,
            },
            periodoAnualBg: {
                backgroundColor: this.state.isPeriodoAnual ? theme.primaryVariant : theme.input,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            periodoAnualTxt: {
                fontSize: 14,
                color: this.state.isPeriodoAnual ? theme.onPrimary : theme.onInput,
            }
        }
        const { width } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <StatusBar backgroundColor={theme.primary} barStyle="light-content" />

                <View>


                    <ProgressBarAndroid style={{ marginTop: -5 }} color={theme.primaryVariant} styleAttr="Horizontal" progress={this.state.Progress_Value} indeterminate={false}
                    />

                    <View style={styles.resultArea}>
                        <Text style={[styles.txt, styles.resultLabel]}>{R.strings.home.capitalInvestido}</Text>
                        <Text style={[styles.txt, styles.resultValueLabel]}>{this.maskNumber(this.state.capital_inv)}</Text>
                        <View style={styles.separador} />
                        <Text style={[styles.txt, styles.resultLabel]}>{R.strings.home.montante}</Text>
                        <Text style={[styles.txt, styles.resultValueLabel]}>{this.maskNumber(this.state.montante)}</Text>
                        <View style={styles.separador} />
                        <Text style={[styles.txt, styles.resultLabel]}>{R.strings.home.juros}</Text>
                        <Text style={[styles.txt, styles.resultValueLabel]}>{this.maskNumber(this.state.juros)}</Text>
                        <View style={styles.separador} />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputRow} >
                            <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.capital}</Text>
                            <TextInputMask
                                style={styles.textInput}
                                keyboardType='phone-pad'
                                type={'money'}
                                options={{
                                    separator: ',',
                                    delimiter: '.',
                                    unit: '$ ',
                                }}
                                placeholder='$ 0.00'
                                value={this.state.capital}
                                includeRawValueInChangeText={true}
                                onChangeText={this.updateCapital}
                                onSubmitEditing={() => this.aportesInput.getElement().focus()}
                                returnKeyType="next"
                                blurOnSubmit={false}

                            />
                        </View>


                        <View style={styles.inputRow} >
                            <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.aportes}</Text>
                            <TextInputMask
                                style={styles.textInput}
                                keyboardType='phone-pad'
                                type={'money'}
                                options={{
                                    separator: ',',
                                    delimiter: '.',
                                    unit: '$ ',
                                }}
                                placeholder='$ 0.00'
                                value={this.state.aportes}
                                includeRawValueInChangeText={true}
                                onChangeText={this.updateAportes}
                                ref={ref => this.aportesInput = ref}
                                onSubmitEditing={() => this.taxaInput.getElement().focus()}
                                returnKeyType="next"
                                blurOnSubmit={false}


                            />
                        </View>

                        <View style={styles.inputRow}>
                            <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.taxa}</Text>
                            <TextInputMask
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
                                ref={ref => this.taxaInput = ref}
                                onSubmitEditing={() => this.periodoInput.getElement().focus()}
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />

                            <View style={switchStyles.switch}>
                                <TouchableOpacity
                                    style={[switchStyles.Touch, switchStyles.taxaMensalBg]}
                                    onLongPress={this.mensalToAnual}
                                    onPress={() => this.setPeriodoTipo('isTaxaMensal')}
                                    onPressIn={this.Start_Progress}
                                    onPressOut={this.Stop_Progress}
                                >
                                    <Text style={[switchStyles.txt, switchStyles.taxaMensalTxt]} >{R.strings.home.mensal}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[switchStyles.Touch, switchStyles.taxaAnualBg]}
                                    onLongPress={this.mensalToAnual}
                                    onPress={() => this.setPeriodoTipo('isTaxaAnual')}
                                    onPressIn={this.Start_Progress}
                                    onPressOut={this.Stop_Progress}
                                >
                                    <Text style={[switchStyles.txt, switchStyles.taxaAnualTxt]} >{R.strings.home.anual}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputRow}>
                            <Text style={[styles.txt, styles.txtLabel]}>{R.strings.home.periodo}</Text>
                            <TextInputMask
                                ref={ref => this.periodoInput = ref}
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
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />

                            <View style={switchStyles.switch}>
                                <TouchableOpacity
                                    style={[switchStyles.Touch, switchStyles.periodoMensalBg]}
                                    onLongPress={this.mesesToAnos}
                                    onPress={() => this.setPeriodoTipo('isPeriodoMensal')}
                                    onPressIn={this.Start_Progress}
                                    onPressOut={this.Stop_Progress}
                                >
                                    <Text style={[switchStyles.txt, switchStyles.periodoMensalTxt]} >{R.strings.home.meses}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[switchStyles.Touch, switchStyles.periodoAnualBg]}
                                    onLongPress={this.mesesToAnos}
                                    onPress={() => this.setPeriodoTipo('isPeriodoAnual')}
                                    onPressIn={this.Start_Progress}
                                    onPressOut={this.Stop_Progress}
                                >
                                    <Text style={[switchStyles.txt, switchStyles.periodoAnualTxt]} >{R.strings.home.anos}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>


                    <View style={{ height: 120 }} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    inputContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },

    inputRow: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'stretch',
        height: 50,
    },

    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        letterSpacing: 1,
    },

    txtLabel: {
        width: '30%',
        backgroundColor: theme.primary,
        color: theme.onPrimary,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },

    textInput: {
        ...R.palette.input,
        backgroundColor: theme.input,
        width: '70%',
    },

    resultRow: {
        flex: 1,
        flexDirection: 'row'
    },
    resultLabel: {
        fontSize: 15,
        color: theme.onSurface
    },
    resultValueLabel: {
        fontSize: 25,
        fontWeight: 'bold',
        color: theme.onSurface,
    },
    resultArea: {
        flex: 1,
        backgroundColor: theme.surface,
        margin: 10,
        paddingVertical: 15,
        borderRadius: 4,
        // elevation: 4,
    },

    txtButton: {
        color: theme.onBackground,
    },

    touchOpacity: {
        ...R.palette.actionButton,
    },
    switchtaxaMensal: {
        ...R.palette.actionButton,
    },

    resultTxt: {


    },



    separador: {
        height: 1.5,
        backgroundColor: 'black',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    adBannerView: {
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

