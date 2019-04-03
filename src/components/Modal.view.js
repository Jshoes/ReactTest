import React, {Component, PropTypes,Children} from 'react'
import {Modal} from 'antd'
import {withRouter} from  'react-router'
// import ErrorBoundary from 'components/ErrorBoundary'

class ModalView extends Component {

  handleBackRoute() {
    let {actions, history,router} = this.props
    actions.backRoute(router)
  }
  handleSaveRoute(){
    let { formView } =this.refs
    //console.log(formView)
    formView.onSubmit()
  }

  render() {
    var {route, children,...otherProps} = this.props
    return (
      <Modal title={route.breadcrumbName} visible={true} maskClosable={false} onCancel={this.handleBackRoute.bind(this)} onOk={this.handleSaveRoute.bind(this)} {...otherProps}>
        {
          React.cloneElement(children,Object.assign({},otherProps,{
            ref:"formView"
          }))
        }
      </Modal>
    )
  }
}

export default withRouter(ModalView)

export class ModalWidthView extends Component {
    handleBackRoute() {
        let {actions, history,router} = this.props
        //console.log(actions)

        actions.backRoute(router)
    }
    handleSaveRoute(){
        let { formView } =this.refs
        //console.log(formView)
        formView.onSubmit()
    }

    render() {
        var {route, children,reduce:{spins:{buttonSpin}},...otherProps} = this.props
        return (
            <Modal  title={route.breadcrumbName} width={800} visible={true} maskClosable={false} onCancel={this.handleBackRoute.bind(this)} onOk={this.handleSaveRoute.bind(this)} confirmLoading={buttonSpin}>
                  {React.cloneElement(children,{...otherProps,ref:"formView"})}
            </Modal>
        )
    }
}

export class ModalViewTitleProps extends Component {
    handleBackRoute() {
        let {closeFn} = this.props
        //console.log(actions)
        closeFn()
    }
    handleSaveRoute(){
        let { formView } =this.refs
        //console.log(formView)
        formView.onSubmit()
    }

    render() {
        var {route, children,propTitle,...otherProps} = this.props

        return (
            <Modal  title={propTitle} visible={true} maskClosable={false} onCancel={this.handleBackRoute.bind(this)} onOk={this.handleSaveRoute.bind(this)} >
              {React.cloneElement(children,{...otherProps,ref:"formView"})}
            </Modal>
        )
    }
}

export class ResumeCalendarModal extends Component{

    render(){
        let {route, children,cancelFn,okFn} = this.props
        return(
            <Modal  title="查看面试安排" visible={true} zIndex="1001" maskClosable={false} onCancel={cancelFn} onOk={okFn} width={1000} >
                <children.type {...this.props} ref="formView"></children.type>
            </Modal>
        )
    }
}


export class ModalDetailView extends Component {
    state={
      visable:true
    }
    componentDidUpdate (prevProps) {
      let {actions,router} = this.props;
      let oldParams = prevProps.params
      let newParams = this.props.params
      if (JSON.stringify(newParams) !== JSON.stringify(oldParams)){
        this.setState({
            visable:true
        })
      }
    }
    handleCancel(){
      let {actions, history,router} = this.props
      this.setState({
          visable:false
      })

      //let pathname = router.getCurrentLocation().pathname

      //console.log(pathname)
      actions.listRoute(router)
      //默认应该使用backListRoute(router)

      //actions.backRoute(router)

    }
    render() {
        var {route, children,router,...otherProps} = this.props
        let {visable} = this.state
        return (
            <Modal wrapClassName="ant-modal-iframe resumeDetail-window"  mask={false} maskStyle={{left:'400px'}}  destroyOnClose={false} onCancel={this.handleCancel.bind(this)}  visible={visable}   footer={null} width={'100%'}  bodyStyle={{overflowY:"auto",overflowX:"hidden"}}>
              {React.cloneElement(children,{...otherProps,ref:"formView"})}
            </Modal>
        )
    }
}

export class ModalStepsView extends Component {
  handleBackRoute() {
    let {actions, history,router} = this.props
    //console.log(actions)

    actions.backRoute(router)
  }
  handleSaveRoute(){
    let { formView } =this.refs
    //console.log(formView)
    formView.onSubmit()
  }

  render() {
    var {route, children,...otherProps} = this.props
    return (
      <Modal  title={route.breadcrumbName} visible={true} maskClosable={false} footer={null} onCancel={this.handleBackRoute.bind(this)} onOk={this.handleSaveRoute.bind(this)} >
        {React.cloneElement(children,{...otherProps,ref:"formView"})}
      </Modal>
    )
  }
}
