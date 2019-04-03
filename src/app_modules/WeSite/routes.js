import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container,{PreviewContainer} from './container'

let Routes = (
  <Router components={null}>
    <IndexRoute component={Container}/>
    <Route path="edit" components={Container}/>
    <Route path="preview/*" components={PreviewContainer}/>
  </Router>
)

export {Container}
export default Routes
