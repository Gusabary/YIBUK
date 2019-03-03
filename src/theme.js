import { createMuiTheme } from '@material-ui/core/styles';
import { purple, lime, lightGreen, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[100],
            main: purple[200],
            dark: purple[300],
        },
        secondary: {
            main: lime['A400'],
            dark: lightGreen['A700'],
        },
        error: {
            main: red[500],
        }
    },
    typography: {
        fontFamily: "Roboto",
    },
});

export default theme;