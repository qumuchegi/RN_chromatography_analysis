import React from 'react';
import {renderRoutes} from 'react-router-config';
import {NativeRouter, Switch, Route} from 'react-router-native';
import Dashboard from '../components/dashboard';

import AutoAlalyze from '../pages/auto-analyze/index';
import AnalyzeResult from '../pages/analyze-result';
import {dashRoutes} from './catalogue';

export default function() {
  return (
    <NativeRouter>
      <Switch>
        <Route
          path='/auto-analyze'
          component={AutoAlalyze}
          exact={true}
        />
        <Route path='/analyze-result' component={AnalyzeResult}/>
        <Route path='/'>
          <Dashboard>
              {renderRoutes(dashRoutes)}
          </Dashboard>
        </Route>
      </Switch>
    </NativeRouter>
  );
}
