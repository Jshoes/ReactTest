import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { EditorState, Modifier,convertFromRaw, convertToRaw, ContentState ,AtomicBlockUtils, Editor, Entity,} from 'draft-js'
import {Button,Icon} from 'antd'
// import {stateToHTML} from 'draft-js-export-html';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { Editor } from 'react-draft-wysiwyg'
import LzEditor from 'react-lz-editor'
import style from './style.less'

export  class EditableRichEditor extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
         value:props.value,
         isModify:false
     };

     this.props.onChange(props.value)
     this.value=props.value
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !==this.props.value){
       this.setState({
         value:nextProps.value
       });
       this.value=nextProps.value

       this.props.onChange(nextProps.value)
    }
  }
  cbReceiver(value){
    // console.log(value)
    let {extBar,type}=this.props
    console.log(this.props)
    this.value=value
    // this.props.onChange(value)
    // this.setState({
    //   value:value
    // });
    if(type=='markdown'){

      let charcountNode=ReactDom.findDOMNode(this).querySelectorAll(".charcount")[0]
      charcountNode.innerHTML= "共计"+(value && (value.trim().length+6) || 0)+"字，"+(value && (Math.ceil(value.trim().length/66)) || 0)+"条短信"
    }
  }
  onBlurChange(){
    this.props.onChange(this.value)
  }

  addText(text){
    let {onChange}=this.props
    let editor=this.refs.editor
    let editorState=editor.state.editorState

    // const blockMap = ContentState.createFromText(text.trim()).blockMap;
    const newState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text,editorState.getCurrentInlineStyle());
    editor.onChange(EditorState.moveFocusToEnd(editor.state.editorState))
    editor.onChange(EditorState.push(editorState, newState, 'insert-characters'))
  }

  render(){
    let {extBar,type}=this.props
    let {value}=this
    // console.log(value)
    return (
      <div className={"EditableRichEditor editorHidden-"+type} onBlur={this.onBlurChange.bind(this)}>
       {
         type=='markdown'?(<div className="charcount">
           共计{value && (value.trim().length+6) || 0}字，{value && (Math.ceil(value.trim().length/66)) || 0}条短信
       </div>):""}

        <LzEditor active={true} lang={"zh_CN"} image={false} video={false} audio={false} color={false} autoSave={false}  importContent={value} cbReceiver={this.cbReceiver.bind(this)}  convertFormat={type} fullScreen={false} ref="editor" image={false}
          video={false}
          audio={false}
          pasteNoStyle={false}
          urls={false}/>
          {
            extBar?(
          <div className="editor-toolbar">
            <Button onClick={this.addText.bind(this,"{姓名}")}>姓名</Button>
            <Button onClick={this.addText.bind(this,"{入职时间}")}>入职时间</Button>
            <Button onClick={this.addText.bind(this,"{所属部门}")}>所属部门</Button>
            <Button onClick={this.addText.bind(this,"{职位名称}")}>职位名称</Button>
            <Button onClick={this.addText.bind(this,"{面试时间}")}>面试时间</Button>

          </div>):(null)

        }
      </div>
    )
  }
}

export class EditableRichEditor1 extends Component{
  state={
    isEdit:false,
    value:""
  }
  constructor(props) {
    super(props);
    this.state = {
       value:props.value,
    };
    // this.props.onChange(props.value)
  }
  componentWillMount(){
    let that=this

    // document.body.removeEventListener('click', function (event) {
    //     event.preventDefault();
    // },false);
    // document.body.addEventListener('click',function(event){
    //   let {onChange} = that.props
    //   let {richEditor} = that.refs
    //   if(event.target.querySelectorAll(".EditableRichEditor").length==0 &&  event.path.filter((it)=>(it.className+"").indexOf("EditableRichEditor")>=0).length==0 && that.refs.richEditor){
    //       onChange(that.refs.richEditor.value)
    //   }
    // },false)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !==this.props.value){
       this.setState({
          value:nextProps.value,
          isEdit:false
       });
    }
  }
  onEditor(){
    this.setState({
      isEdit:true
    })
  }

  render(){
    let {isEdit,value}=this.state
    let {onChange,type,extBar}=this.props
    return(
      <div className={"EditableRichEditor editorHidden-"+type}  >
        {
          (<RichEditor value={value} ref="richEditor" extBar={extBar} type={type} onChange={onChange} />)
        }
      </div>

    )
  }
}

EditableRichEditor.defaultProps = {
  extBar:false,
  type:'html'
}

export default EditableRichEditor
