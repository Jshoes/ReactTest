import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, Modifier,convertFromRaw, convertToRaw, ContentState ,AtomicBlockUtils, Editor, Entity,} from 'draft-js'
import {Button} from 'antd'
// import {stateToHTML} from 'draft-js-export-html';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { Editor } from 'react-draft-wysiwyg'
import LzEditor from 'react-lz-editor'
/*
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class CustomButton extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar: Function = (): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      this.props.text,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <div onClick={this.addStar}>{this.props.text}</div>
    );
  }
}

export default class RichEditor extends Component{
  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(props.value);
     if (contentBlock) {
       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
       const editorState = EditorState.createWithContent(contentState);
       this.state = {
         editorState,
       };
     }
    // this.state.editorState=convertFromRaw(props.value)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !==this.props.value){
      const contentBlock = htmlToDraft(nextProps.value);
       if (contentBlock) {
         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
         const editorState = EditorState.createWithContent(contentState);
         this.setState({
           editorState:editorState
         });
       }
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.props.onChange(stateToHTML(editorState.getCurrentContent()))
    this.setState({
      editorState,
    });
  }

  render(){
    const { editorState } = this.state;
    return (<Editor
        wrapperClassName="demo-wrapper"
        editorState={editorState}
        editorClassName="demo-editor"
        localization={{
          locale: 'zh',
        }}
        toolbar={[{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
            bold: { icon: 'bold', className: undefined },
            italic: { icon: 'italic', className: undefined },
            underline: { icon: 'underline', className: undefined },
            strikethrough: { icon: 'strikethrough', className: undefined },
            monospace: { icon: 'monospace', className: undefined },
            superscript: { icon: 'superscript', className: undefined },
            subscript: { icon: 'subscript', className: undefined },
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            icon: 'fontSize',
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
            unordered: { icon: 'unordered', className: undefined },
            ordered: { icon: 'ordered', className: undefined },
            indent: { icon: 'indent', className: undefined },
            outdent: { icon: 'outdent', className: undefined },
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
            left: { icon: 'left', className: undefined },
            center: { icon: 'center', className: undefined },
            right: { icon: 'right', className: undefined },
            justify: { icon: 'justify', className: undefined },
          },
          embedded: {
            icon: 'embedded',
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          remove: { icon: 'eraser', className: undefined, component: undefined },
        }]}
        onEditorStateChange={this.onEditorStateChange}
        toolbarCustomButtons={this.props.toolbarCustomButtons}
      />)
  }
}

//   toolbarCustomButtons={[<CustomOption text="{面试时间}"/>,<CustomOption text="{面试职位}"/>,<CustomOption text="{候选人姓名}"/>]}
*/

export default class RichEditor extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
       value:props.value
   };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !==this.props.value){
       this.setState({
         value:nextProps.value
       });
    }
  }
  cbReceiver(value){
    // console.log(value)
    this.value=value
  }
  onChange(){
    console.log("onBlur",this.value)



   //  const entityKey = Entity.create(type, 'IMMUTABLE', {src});
   // return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    //onChange(this.value)
  }
  addText(text){
    let {onChange}=this.props
    let editor=this.refs.editor
    let editorState=editor.state.editorState

    // const blockMap = ContentState.createFromText(text.trim()).blockMap;
    const newState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text,editorState.getCurrentInlineStyle());
    editor.onChange(EditorState.push(editorState, newState, 'insert-characters'))
  }

  render(){
    return (
      <div className="abc" onBlur={this.onChange.bind(this)} >
        <LzEditor active={false} importContent={this.state.value} cbReceiver={this.cbReceiver.bind(this)}  convertFormat="markdown" fullScreen={false} ref="editor" image={false}
          video={false}
          audio={false} />
        <div className="editor-toolbar">
          <Button onClick={this.addText.bind(this,"{面试时间}")}>面试时间</Button>
          <Button onClick={this.addText.bind(this,"{面试职位}")}>面试职位</Button>
          <Button onClick={this.addText.bind(this,"{候选人姓名}")}>候选人姓名</Button>
        </div>
      </div>
    )
  }
}
