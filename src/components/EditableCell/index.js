import React, { Component } from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

export default class EditableCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			editable: false,
		}
	}

	handleChange(e) {
		const value = e.target.value;
		this.setState({ value });
	}
	check() {
		this.setState({ editable: false });
		if (this.props.onChange) {
			this.props.onChange(this.state.value);
		}
	}
	edit() {
		this.setState({ editable: true });
	}
	render() {
		const { value, editable } = this.state;
		const { inputType } = this.props
		return (
			<div className="editable-cell">
				{
					editable ? (
						<Input
							value={value}
							onChange={this.handleChange.bind(this)}
							onBlur={this.check.bind(this)}
							onPressEnter={this.check.bind(this)}
							suffix={
								<Icon
									type="check"
									className="editable-cell-icon-check"
									onClick={this.check.bind(this)}
								/>
							}
						/>
					) : (
							<div>
								{value || ' '}
								<Icon
									type="edit"
									className="editable-cell-icon"
									style={{cursor:"pointer",marginLeft:"5px"}}
									onClick={this.edit.bind(this)}
								/>
							</div>
						)
				}
			</div>
		);
	}
}
