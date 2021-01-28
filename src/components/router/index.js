import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Layout from '../layout';

export const Router = () => {
       return (
           <Switch>
               <Route exact path='/chat/:chatId/' component={Layout} />
               <Route exact path='/chat' component={Layout} />
               <Route exact path='/' component={Layout} />
           </Switch>
       );
}

export default Router;