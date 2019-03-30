import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import theme from './theme'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);