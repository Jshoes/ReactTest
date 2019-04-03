import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class Donut extends React.Component {
	genChartData(source){
		let keyArr = Object.keys(source)
		keyArr.map((e)=>{
			return {item:e,percent:source[e]}
		})
		return keyArr.length?keyArr:[{item:'',percent:0}]
	}


  render() {
		const { Html } = Guide;

		// const dv = [{item: "原因一", percent: 0.2},{item: "原因2",  percent: 0.8}]
		const{data} = this.props
		let dv = this.genChartData(data)
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
		};
		let {title,sum}=this.props
		sum = sum?sum:0
		sum*=1
    return (
      <div>
        <Chart
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
					{sum?<Legend
						position="right"
						marker="square"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />:null}

          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
							html={`<div style='color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;'>${title}<br/><span style='color:#262626;font-size:2.5em'>${sum}</span>个</div>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
						{/* item指示线
						<Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            /> */}
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Donut;
