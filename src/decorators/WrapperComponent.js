/**
 * @Date:   2017-09-11T13:26:22+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2017-09-11T17:50:18+08:00
 * @ 外包组件装饰器
 */

import React, {Component, PropTypes} from 'react'

export default(WrappedComponent,propsArgs) => (InnerComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} {...propsArgs}>
          <InnerComponent {...this.props} />
        </WrappedComponent>
      )
    }
  }
}
