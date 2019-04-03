import React, { Component } from 'react'
import AppLayout from 'app/layout'

import Layout,{Fixed,Pane} from 'app/components/Layout'
import HeaderSide from 'app/layout/header'
import ContentSide from 'app/layout/content'
import Notifycation from 'app/layout/notifycation'
import {MultiTab} from 'app/layout/TabsPage'

export default class AppWrapper extends Component {
	render() {
		return (
			<Layout direction="column" >
				<Fixed {...this.props} style={{display:'flex'}}>
					<HeaderSide/>
				</Fixed>
				<Pane style={{display:'flex',flexDirection:'column'}}>
					<MultiTab/>
					{/* <Notifycation />
					<ContentSide>
						{this.props.children}
					</ContentSide> */}
				</Pane>
			</Layout>
		)
	}
}
