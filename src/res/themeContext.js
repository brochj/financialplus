import React from 'react';
import R from 'res/R'

export const themes = {
    light: {
        primary: R.colors.primary, // 500
        primaryVariant: R.colors.primaryVariant, // 700
        secondary: R.colors.secondary, // 200
        secondaryVariant: R.colors.secondaryVariant, // 900
        background: R.colors.background,
        surface: R.colors.surface,

        onPrimary: R.colors.onPrimary,
        onSecondary: R.colors.onSecondary,
        onBackground: R.colors.onBackground,
        onSurface: R.colors.onSurface,

        error: R.colors.error,
        success: R.colors.success,
        warning: R.colors.warning,
        info: R.colors.info,
        disabled: R.colors.disabled,

        onError: R.colors.onError,
        onSuccess: R.colors.onSuccess,
        onWarning: R.colors.onWarning,
        onInfo: R.colors.onInfo,
        onDisabled: R.colors.onDisabled,

        input: R.colors.input,
        inputBorder: R.colors.inputBorder,
        onInput: R.colors.onInput,

    },
    dark: {
        primary: R.colors.primaryVariant, // 500
        primaryVariant: R.colors.primary, // 700
        secondary: R.colors.secondary, // 200
        secondaryVariant: R.colors.secondaryVariant, // 900
        background: '#191919',
        surface: '#262626',

        onPrimary: '#FFF',
        onSecondary: '#000',
        onBackground: '#FFF',
        onSurface: '#FFF',


        error: '#CF6679',
        success: '#018786',
        warning: '#eab61e',
        info: R.colors.info,
        disabled: R.colors.disabled,

        onError: R.colors.onError,
        onSuccess: R.colors.onSuccess,
        onWarning: R.colors.onWarning,
        onInfo: R.colors.onInfo,
        onDisabled: R.colors.onDisabled,

        input: '#282C34',
        inputBorder: R.colors.inputBorder,
        onInput: '#F7F9FC',

    },

};

export const theme = themes.light;

export default ThemeContext = React.createContext({
    theme: themes.dark, // default value
    toggleTheme: () => { }
});

