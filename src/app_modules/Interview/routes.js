import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container,{CalendarContainer,DelayContainer,} from './container'
import {OfferFormContainer,EntryFormContainer,RelatedFormContainer,JoinFormContainer,FeedFormContainer,FeedbackFormContainer,RejectFormContainer} from '../Resume/container'
import {DetailContainer} from '../Job/container'
import {ResumeDetailContainer} from '../Resume/container'
import {creditFormContainer} from '../Credit/container'
import {RoutesResume} from '../Resume/routes'


let Routes = (
  <Router component={null}>
    <IndexRoute components={Container}/>
    <Route path="list" components={Container}>
        {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>
    <Route path="calendar" components={CalendarContainer}>
        {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>


  </Router>
)
export {Container}
export default Routes
