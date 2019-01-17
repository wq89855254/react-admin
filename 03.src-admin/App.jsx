import React, {Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Admin from './pages/admin/admin'
import Login from './pages/login/login'
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}>login</Route>
            <Route path='/' component={Admin}>admin</Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}