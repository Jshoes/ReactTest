import React, { Component } from 'react';
import { List } from "antd";
import style from './style.less'
class ChannelList extends Component {
	render() {
		const{keyName,keyStr,channelKeyName,headerTitle,sortKey}=this.props
		let {dataSource}=this.props
		if(dataSource&&sortKey){
			dataSource=dataSource.sort((a,b)=>a[sortKey]-b[sortKey])
		}
		return(
			<List
				header={headerTitle?headerTitle:null}
			  className="channel-list"
				grid={{ column: 8 }}
				dataSource={dataSource}
				renderItem={item => (
					<List.Item style={{textAlign:'center'}}>
						<div style={{margin:'0 auto'}} className={"channel-img-"+ item[channelKeyName]}></div>
						<div>{item[keyName]?keyStr:''}</div>
					</List.Item>
				)}
			/>
		);
	}
}
ChannelList.defaultProps={
	channelKeyName:'keyValue'
}
export default ChannelList;
