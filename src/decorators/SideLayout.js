

import React, {Component, PropTypes} from 'react'
import {Layout,Fixed,Pane} from 'components/Layout'


export default (SideLayout,props) => (InnerComponent) => {
  return class extends Component {
    render() {
      if(props && props.reverse){
        return (
          <Layout direction="rows">
            <Pane>
              <InnerComponent {...this.props}/>
            </Pane>
            <Fixed>
              <SideLayout {...this.props}  />
            </Fixed>
          </Layout>
        )
      }else{
        return (
          <Layout direction="rows">
            <Fixed>
              <SideLayout {...this.props}  />
            </Fixed>
            <Pane>
              <InnerComponent {...this.props}/>
            </Pane>
          </Layout>
        )
      }
    }
  }
}
