
import React, { Component } from 'react'
import ReactRouter, { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import { LogListContainer,LogDetailContainer } from './container'


let Routes = (
	<Router>
		<Route>
			<IndexRedirect to="1" />
			<Route path=":type" component={LogListContainer}>
				<Route path="detail/:messageId" components={LogDetailContainer}/>
			</Route>
			</Route>
	</Router>
)
// export { Container }
export default Routes
