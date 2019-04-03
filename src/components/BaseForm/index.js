import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Form,Select,Button,Input} from 'antd'
import  FetchAPI from 'app-utils/FetchAPI'
import PropTypes from 'prop-types'
import {TreeSelectPicker} from 'app/components/TreeView'
import moment from 'moment';
const FormCreate = Form.create
const Option = Select.Option;


@FormCreate()
export default class BaseForm extends Form{

  static childContextTypes = {
    formRef : PropTypes.any,
    formLayout:PropTypes.object
  }
  static defaultProps = {
    prefixCls: 'ant-form',
    layout:'horizontal',
    itemLayout:{
      labelCol:6,
      wrapperCol:18
    }
  }
  /*
  constructor(props) {
    super(props);
    let {saveRef,form,ref}= props
  //  saveRef && saveRef.call(this,form)
  }
  */



  getChildContext(){
     var { form,itemLayout } =this.props;
     return {
         formRef: form,
         formLayout:itemLayout
     };
  }
}

/**
 * [AdvancedForm  高级Form组件带valuesChange特征]
 * @extends BaseForm
 */

@FormCreate({
  onValuesChange:function(props,changedValues,values){
    // console.log(props,values)
    if(props.autoSubmitForm){
      props.onSubmit(new Event('submit'),values)
    }
  }
})
class AdvancedForm extends BaseForm{
  static defaultProps = {
     // containerTo:true,
    prefixCls: 'ant-form',
    layout:"inline",
    itemLayout:{
      labelCol:6,
      wrapperCol:18
    }
  }
}

@FormCreate({
  // onValuesChange:function(props,changedValues,values){
  //   // console.log(values)
  //   // props.onSubmit(values)
  //
  //   props.onSubmit(new Event('submit'),values)
  // }
})
class AutoSubmitForm extends BaseForm{

  static defaultProps = {
     // containerTo:true,
    prefixCls: 'ant-form',
    layout:"vertical",
  }
}

class FormItem extends Component{
  constructor(props) {
    super(props);

    if(props.fetch instanceof Array){
      this.state={
        childData:props.fetch
      }
    }else{
      this.state={
        childData:[]
      }
    }

  }

  static defaultProps = {
    containerTo:true
  }
  static contextTypes = {
      formRef: PropTypes.object,
      formLayout:PropTypes.object
  }

  componentWillReceiveProps(nextProps){
    let {children,name,label} = nextProps
    let field=children
    if(field.props.fetch instanceof Array){
      this.setState({
        childData:field.props.fetch
      });
    }
    if(field.props.fetch && typeof(field.props.fetch) == 'string' && field.props.fetch !=this.props.children.props.fetch)
    {
        this.fetchData(field.props.fetch,field.props.params)
    }

  }
  componentWillMount() {
    let {children,name,label} = this.props
    let field=children;
    if(typeof(field.props.fetch)== 'string' && field.props.fetch.length>0){
        this.fetchData(field.props.fetch,field.props.params)
    }else if(field.props.fetch instanceof Array){
        this.setState({
          childData:field.props.fetch
        });
      }
  }
  /**
   * [fetchData 获取远程接口数据]
   * @param  {[type]} fetchUrl [description]
   * @return {[type]}          [description]
   */
  fetchData(fetchUrl,params){
    let body={}
    if(params && /\/listJson?$/.test(fetchUrl)?'POST':'GET'){
      body={body:params}
    }
    new FetchAPI().fetch(fetchUrl,{
      ...body,
			method:/\/listJson?$/.test(fetchUrl)?'POST':'GET' //兼容listJSON 使用POST请求处理
    }).then((json) => {
        this.setState({
          childData:json.list|| json ||[]
        });
    });
  }
  renderField(){
    let {children,name,label,containerTo} = this.props
    let {childData} = this.state;
    let field=children;
    let {defaultValue,...otherProps}= field.props
    // console.log(ReactDOM.findDOMNode(this));
    // getPopupContainer
    let containerToProp={}
    let treeDataProp={}
    if(containerTo && field.type===Select  && !field.props.changeCalendarContainer ){
      containerToProp={
        getPopupContainer:()=>ReactDOM.findDOMNode(this)
      }
    }


    if(containerTo && field.type.name==="CalendarPicker" && !field.props.changeCalendarContainer ){
        containerToProp={
          getCalendarContainer:()=>ReactDOM.findDOMNode(this),
        }
    }

    // console.log("TreeSelectPicker",field.type.name)
    // console.log(field.type,field.type == TreeSelectPicker)
    if(field.type == TreeSelectPicker){
      treeDataProp={
        treeData:this.loopTreeData(childData)
      }
    //  console.log(treeDataProp)
    }
    if(childData.length==0){
      return React.createElement(field.type,Object.assign({},otherProps,containerToProp,treeDataProp))
    }else if(field.props.renderItem){
      return React.createElement(field.type,Object.assign({},otherProps,containerToProp,treeDataProp),childData.map((d,idx) =>field.props.renderItem && field.props.renderItem(d,idx)))
      // return (
      //   <field.type {...otherProps} {...containerToProp} >
      //     {childData.map((d,idx) =>field.props.renderItem && field.props.renderItem(d,idx))}
      //   </field.type>)
    }else{
      return React.createElement(field.type,Object.assign({},otherProps,containerToProp,treeDataProp))
    }
  }
  loopTreeData(data){
    let that = this
    return data.map((item) => {
			if (item.children && item.children.length) {
				return Object.assign(item,{title:item.text,value:item.id,key:item.id},{children:this.loopTreeData(item.children)})
			}else{
	      return Object.assign(item,{title:item.text,value:item.id,key:item.id})
      }
		})
  }
  render(){
    let element=this.props.children
    let {children,name,label,rules} = element.props
    let {childData} = this.state
    let {defaultValue,...otherProps} =element.props
    let {formRef:{getFieldDecorator},formLayout}= this.context
    let styles={}
    // 类型转换
    // if(element.type.name=='CalendarPicker'){
    //   defaultValue=[(defaultValue[0]==""|| !defaultValue[0]) ?null:moment(defaultValue[0]),(defaultValue[1]==""|| !defaultValue[1])?null:moment(defaultValue[1])]
    // }
    //  reset antd-form-item  marginBottom value
    if(element.type==Input && element.props.type=="hidden"){
      styles={
        style:{marginBottom:0}
      }
    }
    return (<Form.Item label={label} {...Object.assign({},...formLayout,this.props)} colon={false} {...styles}>
      {getFieldDecorator(name,{...otherProps,initialValue:defaultValue})(this.renderField())}
    </Form.Item>)
  }
}

let customRules={

   checkWeekPassword: (rule, value, callback) =>{

     if (/^\d{6}$/.test(value)) {
         callback('密码为弱密码！')
     }

     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
     callback()
   },
   /**
    * [checkMobile 手机号码格式]
    * @param  {[type]}   rule     [description]
    * @param  {[type]}   value    [description]
    * @param  {Function} callback [description]
    * @return {[type]}            [description]
    */
   checkMobile: (rule, value, callback) =>{
     var rexp= /^(0?1[123456789]\d{9})$/
     if (!rexp.test(value)) {
         callback('手机号码格式不正确！')
     }

     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
     callback()
   },
   checkIDCard: (rule, value, callback) =>{
     var rexp= /(^\d{17}(\d|x|X)$)/i
     if (!rexp.test(value)) {
         callback('身份证号码格式不正确！')
     }else{
     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
       callback()
     }
   },
   spacialStr:(rule,value,callback) =>{
     var rexp = /[`~!@#\$\^\&*()=|{}':;',\[\].<>\?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/
    if(!rexp.test(value)){
      callback('不能输入特殊字符')
    }else{
      callback()
    }
   },
   integer:(rule,value,callback)=>{
     var rexp=/^([1-9]\d*|[0]{0,1})$/
     if(value instanceof Array){
         value.map((it,idx)=>{
           if (!rexp.test(it)) {
               callback('必须为正整数！')
           }
         })
     }else if(typeof(value) == "string"){
       if (!rexp.test(value)) {
           callback('必须为正整数！')
       }
     }
     callback()
   },
   maxLength:(rule,value,callback)=>{
     if(value && value.length>rule.value){
        callback('不能大于'+rule.value+'项')
     }else{
       callback()
     }
   },
   tagMaxLength:(rule,value,callback)=>{
     if(value && value.split(",").length > 5){
       callback("备注标签最多5项")
     }else{
       callback()
     }
   },
   remote:(rule,value,callback)=>{
     // console.log(rule,value,callback,aa,bb,cc)
     if(rule.defaultValue != value){
       let name = rule.name
       let params = rule.params?rule.params:{}
       params[rule['name']]=value
       console.log(params)
       new FetchAPI().fetch(rule.value,{
         body:params,
         method:"POST"
         // method:/\/listJson?$/.test(fetchUrl)?'POST':'GET' //兼容listJSON 使用POST请求处理
       }).then((json) => {
         // console.log(json)
         if(json.status){
           if(json.msg){
             callback(json.msg)
           }else{
             callback('该字段系统内已存在！')
           }
         }else {
           callback()
         }
       });
     }else {
       callback()
     }
   },
    /*先判断是手机号再发请求验证
    *
    * */
    newAccount:(rule,value,callback) =>{
        var rexp= /^(0?1[123456789]\d{9})$/
        if (rexp.test(value)) {
            let params = {
                account:value
            }
            new FetchAPI().fetch(rule.value,{
                body:params,
                method:"POST"
                // method:/\/listJson?$/.test(fetchUrl)?'POST':'GET' //兼容listJSON 使用POST请求处理
            }).then((json) => {
                if(json.status){
                    rule.callbackFn(json)
                }else{
                    callback()
                }
            });
        }
    },
    required:(rule,value,callback)=>{
        //console.log(value)
        if(value instanceof Array){
            value.map((it,idx)=>{
                if((it+"").trim().length <= 0 || !it){
                    callback("必须填写非空字符！")
                }
            })
        }else if(typeof(value) == "string"){
            if(value.trim().length <= 0){
                callback("必须填写非空字符！")
            }
        }
        callback()
    },
    dateRangePicked:(rule,value,callback)=>{
        // console.log(value)
        var days = rule.days
        let diffDays = value[1].diff(value[0],"days")
        if(diffDays > days) {
          callback("日期差不能超过"+days+"天")
        }else {
          callback()
        }
    },
    dateCompare:(rule,value,callback)=>{
        // console.log(value)
        var date = rule.date
        var type = rule.type
        if(value && date){
          let diff = value.diff(date)
          if(type == "bigger"){
            if(diff < 0) {
              callback("结束时间必须大于开始时间！")
            }
          }else if(type == "smaller"){
            if(diff > 0) {
              callback("开始时间必须小于结束时间！")
            }
          }
        }
        callback()
    },
    checkIsDefault:(rule,value,callback)=>{
        if(value && value.length>0 && value.filter(v=>v.isDefault==1).length==0){
            callback("最少设置一项默认项")
        }
        callback()
    },
    checkCompanyArea:(rule,value,callback)=>{
      if(value && value.length>0){
          value.filter(v=>{
            if(v.companyArea=="" || v.company==""){
              callback("公司名称与所在地区不允许为空")
            }
            // console.log(value.filter((s)=>s.company == v.company).length)
            if(value.filter((s)=>s.company == v.company).length>1 ){
               callback("公司名称重复")
            }

          })
          callback()
      }
      callback()
    },
   checkFetch:(rule,value, callback) =>{
     //fetch(url).then()
     alert("还没有实现")
	 },
	 orgCompare:(rule,value, callback) =>{
		//fetch(url).then()
		if(rule.unAvailableIdArr.indexOf(value)>-1){
			callback("不可选择当前部门及子部门")
		}else{
			callback()
		}

	}
}
export {AdvancedForm,FormItem,AutoSubmitForm,customRules}
