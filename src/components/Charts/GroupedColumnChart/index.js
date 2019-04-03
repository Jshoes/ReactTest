import React, { Component } from 'react'
import { Chart, Axis, Tooltip, Geom, Legend,G2} from "bizcharts"
import style from './style.less'
G2.track(false);
export default class GroupedColumnChart extends Component {
	__genChartDataType(keyStr){
		if(keyStr.indexOf('Filtered')>-1){
			return '已筛选'
		}else if(keyStr.indexOf('LeaveInvite')>-1){
			return '已邀约'
		}else if(keyStr.indexOf('Interviewed')>-1){
			return '待面试'
		}else if(keyStr.indexOf('Offered')>-1){
			return '已发送offer'
		}else if(keyStr.indexOf('Entried')>-1){
			return '已入职的候选人'
		}
	}
	_genChartDataNameAndType(keyStr,axisType){
		if(axisType==1){
			if(keyStr.indexOf('last')>-1){
				return {name:'昨天',type:this.__genChartDataType(keyStr)}
			}else if(keyStr.indexOf('this')>-1){
				return {name:'今天',type:this.__genChartDataType(keyStr)}
			}
		}else if(axisType==2){
			if(keyStr.indexOf('last')>-1){
				return {name:'上周',type:this.__genChartDataType(keyStr)}
			}else if(keyStr.indexOf('this')>-1){
				return {name:'本周',type:this.__genChartDataType(keyStr)}
			}
		}else if(axisType==3){
			if(keyStr.indexOf('last')>-1){
				return {name:'上月',type:this.__genChartDataType(keyStr)}
			}else if(keyStr.indexOf('this')>-1){
				return {name:'本月',type:this.__genChartDataType(keyStr)}
			}
		}
	}
	genChartData(dataSource,axisType){
		console.log(dataSource,'dadadaadada')
		let {type,...rest}=dataSource
		let dataKeys=Object.keys(rest)
		return dataKeys.map((ele,idx)=>{
			let dataItem = this._genChartDataNameAndType(ele,axisType)
			dataItem.num = dataSource[ele]
			return dataItem
		})
	}
	render() {
		const{dataSource,axisType}=this.props
		const data = this.genChartData(dataSource,axisType)
		return (
			<Chart className="grouped-column-chart" height={300}  data={data} forceFit>
				<Axis name="type" />
				<Axis name="num" />
				<Legend />
				<Tooltip crosshairs={{ type: "y" }} />
				<Geom type='interval' position="type*num" color={'name'} adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
			</Chart>
		)
	}
}
