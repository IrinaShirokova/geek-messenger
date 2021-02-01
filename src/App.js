import React from 'react';
import Router from './components/router';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import initStore from './utils/store';

export const App = (props) => { 

  return (
  <Provider store={ initStore() }>
    <BrowserRouter>
        <MuiThemeProvider>
          <Router/>
        </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
  )}

export default App;