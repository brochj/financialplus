import colors from './colors';
import fonts from './fonts';

const styles = {
    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    card: {
        borderRadius: 10,
    },

    // FONTS 
    basicText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },


    largeTitle: {
        fontSize: fonts.size.largeTitle,
        fontWeight: fonts.weight.normal,
    },
    extraTitle: {
        fontSize: fonts.size.extraTitle,
        fontWeight: fonts.weight.normal,
    },
    title1: {
        fontSize: fonts.size.title1,
        fontWeight: fonts.weight.normal
    },
    title2: {
        fontSize: fonts.size.title2,
        fontWeight: fonts.weight.normal
    },
    title3: {
        fontSize: fonts.size.title3,
        fontWeight: fonts.weight.normal
    },
    headline: {
        fontSize: fonts.size.headline,
        fontWeight: fonts.weight.semiBold
    },
    body: {
        fontSize: fonts.size.body,
        fontWeight: fonts.weight.normal
    },
    callout: {
        fontSize: fonts.size.callout,
        fontWeight: fonts.weight.normal
    },
    subhead: {
        fontSize: fonts.size.subhead,
        fontWeight: fonts.weight.normal
    },
    footnote: {
        fontSize: fonts.size.footnote,
        fontWeight: fonts.weight.normal
    },
    caption1: {
        fontSize: fonts.size.caption1,
        fontWeight: fonts.weight.normal
    },
    caption2: {
        fontSize: fonts.size.caption2,
        fontWeight: fonts.weight.normal
    }
};

export default styles;