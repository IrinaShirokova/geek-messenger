import React from 'react';

import Router from './components/router';
import { BrowserRouter } from 'react-router-dom';

export const App = (props) => { 

  return <BrowserRouter>
      <Router/>
  </BrowserRouter>
}

export default App;