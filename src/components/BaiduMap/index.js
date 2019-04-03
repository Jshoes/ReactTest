import React, { Component } from 'react'
import Script from 'react-load-script'
import  './style.css'
export default class BaiduMap extends Component {
	state = { location: [116.331398, 39.897445] }
	constructor(props) {
		super(props)
		this.state.location = props.location
	}
	_handlePointChange(point) {
		this.props.onChange([point.lng, point.lat])
		console.log(point, '_handlePointChange')

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.accurateAddress != this.props.accurateAddress ) {
			this.setState({
				accurateAddress: nextProps.accurateAddress
			}, () => {
				this._handleAccurateAddressChange(this.state.accurateAddress)
			})
		}
	}
	_handleAccurateAddressChange(val) {
		let that = this
		console.log(val)
		window.map.clearOverlays()
		window.geoc.getPoint(val, function (point) {
			if (point) {
				that._handlePointChange(point)//坐标必填？O:X
				window.map.centerAndZoom(point, 16);
				window.map.addOverlay(new window.BMap.Marker(point));
			}
		})
	}
	handleScriptLoad() {
		let that = this
		const { value ,} = this.props
		const location=[116.331398, 39.897445]
		if(window.initBaiduMap){
			window.map = new window.BMap.Map('allmap');
			window.map.enableScrollWheelZoom()
			// if(value.length>0){
			// 	window.point = new window.BMap.Point(...value);
			// 	console.log(value,'dsadsadasdsadasdsadas')
			// 	that.props.onChange(value)
			// }else{
			// 	window.point = new window.BMap.Point(...location);
			// 	that.props.onChange([])
			// }
			window.point = new window.BMap.Point(...value);
			window.map.addOverlay(new window.BMap.Marker(window.point));
			window.map.centerAndZoom(window.point, 12);
			window.geoc = new window.BMap.Geocoder();
			window.map.addEventListener("click", function (e) {
				window.map.clearOverlays()
				window.map.addOverlay(new window.BMap.Marker(e.point));
				that._handlePointChange(e.point)
			});
		}
		window.initBaiduMap = function () {
			window.map = new window.BMap.Map('allmap');
			window.map.enableScrollWheelZoom()
			// if(value.length>0){
			// 	window.point = new window.BMap.Point(...value);
			// 	that.props.onChange(value)
			// }else{
			// 	window.point = new window.BMap.Point(...location);
			// 	that.props.onChange([])
			// }
			window.point = new window.BMap.Point(...value);
			window.map.addOverlay(new window.BMap.Marker(window.point));
			window.map.centerAndZoom(window.point, 12);
			window.geoc = new window.BMap.Geocoder();
			window.map.addEventListener("click", function (e) {
				window.map.clearOverlays()
				window.map.addOverlay(new window.BMap.Marker(e.point));
				that._handlePointChange(e.point)
			});
		}

	}
	handleScriptError() {
		console.log('error')
	}
	render() {
		return (
			<div>
				<Script url="http://api.map.baidu.com/api?v=2.0&ak=uGaLPgqMWw0VExOETV2Hb1vucnoG3PQ5&callback=initBaiduMap" onLoad={this.handleScriptLoad.bind(this)} onError={this.handleScriptError.bind(this)} />
				<div id="allmap" ref='allmap' style={{ height: '200px' }}>
				</div>
			</div>
		)
	}
}
