import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import {SoundListContainer, SoundFormContainer} from './container'

let Routes = (
  <Router>
    <IndexRoute component={SoundListContainer}/>
    <Route path="list" components={SoundListContainer}/>
  </Router>
)

export default Routes
