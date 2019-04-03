import React, {Component, PropTypes} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Dropdown,
    Icon,
    Spin,
    Rate,
    Select,
    DatePicker,
    Upload,
} from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import ModalView ,{ModalDetailView} from 'components/Modal.view'
import CalendarPicker from 'components/CalendarPicker'
import BaseForm,{FormItem} from 'components/BaseForm'
import DictUtils from 'app-utils/DictUtils'
import WrapperComponent from '../../decorators/WrapperComponent'
const { TextArea } = Input;
const Option = Select.Option

import {EliteDetailShow}  from 'components/Resume'

export default class AddEliteView extends Component{
    componentWillMount() {
        let {actions,router,reduce:{item}} = this.props;
        actions.newItemAction()
    }
    render(){
        let {actions,reduce,router} = this.props
        let {item} = reduce
        return(
            <EliteDetailShow reduce={reduce} router={router} actions={actions} hide={true}/>
        )
    }
}
