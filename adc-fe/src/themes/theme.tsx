import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  components: {
    MuiSvgIcon: {
      defaultProps: {
        htmlColor: '#182356',
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#182356',
          fontSize: '1rem',
        },
      },
    },
  },
  palette: {
    primary: { main: '#7791a1', contrastText: '#ffffff' },
    secondary: { main: '#182356', contrastText: '#ffffff' },
    background: { default: '#d6dae1', paper: '#ffffff' },
    text: { primary: '#0c1321', secondary: '#68758B' },
    action: { active: '#6b778c' },
    success: { main: '#4caf50', contrastText: '#ffffff', light: '#c7efc7' },
    warning: { main: '#ff9800', contrastText: '#ffffff' },
    error: { main: '#f44336', contrastText: '#ffffff' },
    grey: {
      '50': '#BDBDBD',
      '300': '#E0E0E0',
      '500': '#D0D4DB',
      '700': '#DFDFDF',
      '800': '#F4F5F7',
      A700: '#616161',
    },
  },
  direction: 'ltr',
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    button: { fontWeight: 600 },
    h1: { fontWeight: 300, fontSize: '3.5rem' },
    h2: { fontWeight: 300, fontSize: '3rem' },
    h3: { fontWeight: 400, fontSize: '2.25rem' },
    h4: { fontWeight: 400, fontSize: '2rem' },
    h5: { fontWeight: 400, fontSize: '1.5rem' },
    h6: { fontWeight: 500, fontSize: '1.125rem' },
    subtitle1: { fontSize: '0.875rem' },
    subtitle2: { fontSize: '0.75rem' },
    overline: { fontWeight: 600 },
  },
};

export default responsiveFontSizes(createTheme(themeOptions));
