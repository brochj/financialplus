import colors from './colors';

const palette = {
    heading: {
        color: colors.title,
        fontSize: 20,
        textAlign: 'center'
    },
    text: {
        color: colors.text,
        fontSize: 17,
        textAlign: 'center'
    },
    lightTxt: {
        color: colors.blueish[50],
    },
    darkTxt: {
        color: colors.blackish,
    },
    input: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: colors.blueish[50],
        color: colors.txt,
        letterSpacing: 1,
        fontSize: 18,
        paddingLeft: 10,
    },
    actionButton: {
        borderRadius: 3,
        backgroundColor: colors.actionButton,
        padding: 15,
    },

};

export default palette;