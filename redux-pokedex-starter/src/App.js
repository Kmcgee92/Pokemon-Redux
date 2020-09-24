import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPanelRedux from './LoginPanelRedux';
import PokemonBrowser from './PokemonBrowser';
import {connect} from 'react-redux';
import {PrivateRoute} from './PrivateRoute';

const App = (props) => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPanelRedux} />
          <PrivateRoute path="/"
                        exact={true}
                        needLogin={props.needLogin}
                        component={PokemonBrowser}/>
          <PrivateRoute path="/pokemon/:pokemonId"
                        exact={true}
                        needLogin={props.needLogin}
                        component={PokemonBrowser}/>
        </Switch>
      </BrowserRouter>
    )
  }

const mapStateToProps = state => {
  return {
    needLogin: !state.authentication.id
  }
}

export default connect(mapStateToProps, null)(App);
