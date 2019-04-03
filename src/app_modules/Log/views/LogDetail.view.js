import React, { Component } from 'react'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'

@WrapperComponent(ModalView)
export default class LogDetailView extends Component {

	componentDidMount() {

		const{actions,params} = this.props
		actions.logDetailAction({messageId:params.messageId})
	}

	render() {
		const{logDetail}=this.props
		return (
			[<div>{logDetail.title}</div>,
			<div>{logDetail.messageContent}</div>]
		)
	}
}
