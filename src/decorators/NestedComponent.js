/**
 * @Date:   2017-09-11T13:26:22+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-06-14T08:11:24+08:00
 * @ 外包组件装饰器
 */

import React, {Component, PropTypes} from 'react'

export default(NestedComponent) => (InnerComponent) => {
  return class extends Component {
    render() {
      let {children,...otherProps}=this.props
      if(children){
        return [
            <InnerComponent {...otherProps} />,
            React.cloneElement(children)
        ]
      }else{
        return (<InnerComponent {...otherProps} />)
      }
    }
  }
}
