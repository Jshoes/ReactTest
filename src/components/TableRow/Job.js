import React,{Component} from 'react';
import ReactDOM from 'react-dom';


export default class JobTitleInTable extends Component{
  render(){
    let {item:{jobCode,jobTitle,address,groupName}} = this.props
    return(
      <div className="Data" style={{color:'rgba(0,0,0,.65)'}}>
        <div className="Data-group ">
          <span className="margin-right">{jobTitle}</span>
          { jobCode && (<span style={{marginLeft:'5px'}}>({jobCode})</span>) }
        </div>
        <div className="Data-group">
          <span className="margin-right">{address}</span>
          <span style={{marginLeft:'5px'}}>{groupName}</span>
        </div>
      </div>
    )
  }
}
