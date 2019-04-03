import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'
import Container,{recordContainer,withdrawContainer,authentContainer,passwordContainer,shareContainer} from './container'


let Routes = (
    <Router component={null}>
            <Route path="list" components={Container}>
                <Route path="withdrawals" components={withdrawContainer} breadcrumbName="提现"/>
                <Route path="bereal" components={authentContainer} breadcrumbName="实名认证"/>
                <Route path="changepassword" components={passwordContainer} breadcrumbName="修改密码"/>
            </Route>
            <Route path="presentrecord" components={recordContainer}/>
            <Route path="share" components={shareContainer}/>
    </Router>
)

export {Container}
export default Routes
