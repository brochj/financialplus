import React from "react";
import { StyleSheet, Text, View, FlatList, Button, ScrollView, Dimensions } from "react-native";
import { TextInputMask, MaskService } from "react-native-masked-text";
import { AdMobBanner, } from 'expo-ads-admob';
import Accordion from 'react-native-collapsible/Accordion';
import { DrawerActions } from 'react-navigation-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import R from 'res/R';



export default class Results extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: R.strings.home.resultados,
            headerRight: (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="vertical-align-top"
                        size={28}
                        onPress={navigation.getParam('scrollToTop')}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <MaterialIcons
                        name="vertical-align-bottom"
                        size={28}
                        onPress={navigation.getParam('scrollToEnd')}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <MaterialIcons
                        name="format-align-left"
                        size={35}
                        onPress={navigation.getParam('closeAccordion')}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                </View>
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ closeAccordion: this._closeAccordion });
        this.props.navigation.setParams({ scrollToEnd: this._scrollToEnd });
        this.props.navigation.setParams({ scrollToTop: this._scrollToTop });
    }

    _closeAccordion = () => {
        let s = this.state;
        s.activeSections = [];
        this.setState(s);
        this._scrollToTop;
    };

    _scrollToEnd = () => {
        this.scrollView.scrollToEnd({ animated: true });
    }

    _scrollToTop = () => {
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
    constructor(props) {
        super(props);
        this.state = {
            capital: 100000,
            aportes: 150,
            capital_inv: 0,
            periodo: 60,
            taxa: 3,
            lastTaxa: 0,
            montante: 0,
            montanteAnterior: 0,
            juros: 0,

            isTaxaAnual: false,
            isTaxaMensal: true,
            isPeriodoAnual: false,
            isPeriodoMensal: true,
            relatorioData: [],
            activeSections: [],
        };

        this.relatorio = this.relatorio.bind(this);
        this.maskNumber = this.maskNumber.bind(this);
        this.insertValues = this.insertValues.bind(this);
        this.getInputValues = this.getInputValues.bind(this);
        // this.relatorio();

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

    getInputValues(){
        let s = this.state;
        const { params } = this.props.navigation.state;
        s.aportes= params.aportes;
        s.periodo= params.periodo;
        s.capital= params.capital;
        s.taxa= params.taxa;
        
        s.isTaxaAnual= params.isTaxaAnual;
        s.isTaxaMensal= params.isTaxaMensal;
        s.isPeriodoAnual= params.isPeriodoAnual;
        s.isPeriodoMensal= params.isPeriodoMensal;
        this.relatorio();
    }

    insertValues(index) {
        let s = this.state;
        
        s.juros = s.montante - s.capital_inv;
        
        s.relatorioData.push({
            title: `${R.strings.results.mes} ${index}`,
            key: index.toString(),

            taxa: s.taxa,
            montante: this.maskNumber(s.montante),
            capital_inv: this.maskNumber(s.capital_inv),
            juros: this.maskNumber(s.juros),
            jurosPeriodo: this.maskNumber(s.montante - s.montanteAnterior),
        });
    }
    relatorio() {
        let s = this.state;
        if ((s.capital != 0 || s.aportes != 0) && s.taxa != 0 && s.periodo != 0) {
            s.relatorioData = [];
            s.montante = 0;

            if (s.isPeriodoAnual && s.isTaxaMensal) {
                for (let i = 1; i <= s.periodo * 12; i++) {
                    if (s.montante == 0) {
                        s.capital_inv = s.capital + s.aportes; //Ok
                        s.montanteAnterior = s.capital_inv; //ok
                        s.montante = s.capital_inv * (1 + s.taxa/100); //Ok
                        this.insertValues(i);
                    } else {
                        s.capital_inv = s.capital + (s.aportes * i); //OK
                        s.montanteAnterior = (s.montante + s.aportes); //ok
                        s.montante = s.montanteAnterior * (1 + s.taxa / 100); //ok
                        this.insertValues(i);
                    }
                }
            } else if (s.isPeriodoMensal && s.isTaxaAnual) {
                for (let i = 1; i <= s.periodo / 12; i++) {
                    if (s.montante == 0) {
                        s.capital_inv = s.capital + s.aportes; //Ok
                        s.montanteAnterior = s.capital_inv; //ok
                        s.montante = s.capital_inv * (1 + s.taxa/100); //Ok
                        this.insertValues(i);
                    } else {
                        s.capital_inv = s.capital + (s.aportes * i); //OK
                        s.montanteAnterior = (s.montante + s.aportes); //ok
                        s.montante = s.montanteAnterior * (1 + s.taxa / 100); //ok
                        this.insertValues(i);
                    }
                }
            } else if ((s.isPeriodoAnual && s.isTaxaAnual) ||
                (s.isPeriodoMensal && s.isTaxaMensal)) {
                for (let i = 1; i <= s.periodo; i++) {
                    if (s.montante == 0) {
                        s.capital_inv = s.capital + s.aportes; //Ok
                        s.montanteAnterior = s.capital_inv; //ok
                        s.montante = s.capital_inv * (1 + s.taxa/100); //Ok
                        this.insertValues(i);
                    } else {
                        s.capital_inv = s.capital + (s.aportes * i); //OK
                        s.montanteAnterior = (s.montante + s.aportes); //ok
                        s.montante = s.montanteAnterior * (1 + s.taxa / 100); //ok
                        this.insertValues(i);
                    }
                }
            }
        }
        this.setState(s);
    }

    _renderSectionTitle = section => {
        return (
            <View style={styles.sectionTitle}>
                {/* <Text>{section.content}</Text> */}
            </View>
        );
    };

    _renderHeader = (section, index, isActive) => {
        if (isActive) {
            return (
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <Text style={styles.headerLabelText}>{section.title}</Text>
                    </View>
                    <MaterialIcons
                        name="expand-less"
                        size={25}
                        color={R.colors.blackish}
                        style={styles.headerIcon}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <View style={styles.headerLabelView}>
                            <Text style={styles.headerLabelText}>{section.title}</Text>
                        </View>
                        <View style={styles.headerValueView}>
                            <Text style={styles.headerValueText}>+ {section.jurosPeriodo}</Text>
                        </View>
                    </View>
                    <MaterialIcons
                        name="expand-more"
                        size={25}
                        color={R.colors.blackish}
                        style={styles.headerIcon}
                    />

                </View>
            );
        }

    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.txtLabel}>{R.strings.results.taxaAcumulada}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <Text style={styles.txtValue}>{section.taxa}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.txtLabel}>{R.strings.results.montante}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <Text style={styles.txtValue}>{section.montante}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.txtLabel}>{R.strings.results.capitalInvestido}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <Text style={styles.txtValue}>{section.capital_inv}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.txtLabel}>{R.strings.results.jurosAcumulado}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <Text style={styles.txtValue}>{section.juros}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewLabel}>
                        <Text style={styles.txtLabel}>{R.strings.results.jurosDoPeriodo}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <Text style={styles.txtValue}>{section.jurosPeriodo}</Text>
                    </View>
                </View>

            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };
    render() {
        const { width } = Dimensions.get('window');
        return (
            <View style={styles.body}>
                <Button title='calcular' onPress={this.getInputValues} />

                <ScrollView style={styles.accordion}
                    ref={(view) => {
                        this.scrollView = view;
                    }}
                >

                    <Accordion
                        sections={this.state.relatorioData}
                        activeSections={this.state.activeSections}
                        renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                        // collapsed={false}

                        underlayColor={R.colors.blackish}
                        expandMultiple={true}
                    />
                </ScrollView>
                <AdMobBanner
                    bannerSize={(width <= 360) ? 'banner' : 'fullBanner'}
                    adUnitID="ca-app-pub-9080032444400275/4921852795" // Test ID, Replace with your-admob-unit-id ca-app-pub-3940256099942544/6300978111
                    testDeviceID="EMULATOR"
                    onDidFailToReceiveAdWithError={this.bannerError}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accordion: {
        alignSelf: 'stretch',
        // width: '90%',
    },
    sectionTitle: {
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 45,
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderColor: R.palette.darkTxt.color,
    },
    subHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 45,
    },
    headerLabelView: {
        flex: 1,
    },
    headerValueView: {
        flex: 2.5,
    },
    headerLabelText: {
        ...R.palette.text,
        color: R.palette.darkTxt.color,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10,
    },
    headerValueText: {
        ...R.palette.text,
        color: R.palette.darkTxt.color,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    headerIcon: {
        marginRight: 10,
        marginLeft: 20
    },
    content: {
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    viewLabel: {
        width: '45%'
    },
    viewValue: {
        flex: 1,
        alignSelf: 'stretch',
    },
    txtLabel: {
        fontSize: 16,
        textAlign: 'right',
        color: R.palette.lightTxt.color,
        backgroundColor: R.palette.darkTxt.color,
        padding: 5,
        marginVertical: 1.5,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,

    },
    txtValue: {
        fontSize: 16,
        color: R.palette.darkTxt.color,
        backgroundColor: R.palette.lightTxt.color,
        padding: 5,
        marginVertical: 1.5,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    }
});