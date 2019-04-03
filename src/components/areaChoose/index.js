/**
 * Created by Administrator on 2018/2/27.
 */
import React,{Component} from 'react'
import { Cascader ,Input} from 'antd';
import  FetchAPI from 'app-utils/FetchAPI'

export default class AreaChoose extends Component{
    state = {
        options:[],
        defaultValue:"",
    }
    constructor(props){
        super(props)
        // console.log(props.value)
        this.state.defaultValue=props.value
    }
    componentWillMount(){
        this.fetchRequest()
    }
    fetchRequest(params,targetOption){
        new FetchAPI().fetch(`${APP_SERVER}/sysChina/listJson`,{
            method:'POST',
            body:params
        }).then((json) => {
            let options = json.list.map((it,idx)=>{
                    return  Object.assign({},it,{label:it.name,value:it.id,isLeaf: it.type == 2?true:false })
                })
            if(params){
                targetOption.loading = false
                targetOption.children = options
                this.setState({
                    options: [...this.state.options],
                })
            }else{
                this.setState({
                    options:options
                })
            }

        });
    }
    onChange(val,selected){
        let {onChange}= this.props;
        onChange(val)
    }
    loadData(selected){
        const targetOption = selected[selected.length - 1]
        targetOption.loading = true
        const translate = {
            0:1,
            1:2,
            2:3,
        }
        let params = {
            type:translate[targetOption.type],
            id:targetOption.id
        }
        this.fetchRequest(params,targetOption)
    }

    render(){
        let {options,defaultValue} = this.state
        return(
            <Cascader
                options={options}
                defaultValue={defaultValue}
                loadData={this.loadData.bind(this)}
                onChange={this.onChange.bind(this)}
                changeOnSelect
            />
        )
    }
}