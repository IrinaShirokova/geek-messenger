import React from 'react';
import Router from './components/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import initStore from './utils/store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = initStore();

export const App = (props) => { 

  return (
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <BrowserRouter>
          <MuiThemeProvider>
            <Router/>
          </MuiThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  )}

export default App;