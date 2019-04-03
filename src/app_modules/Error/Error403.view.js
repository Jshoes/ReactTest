import React, {Component} from 'react'
import Exception from '../../components/Exception'

export default class Error404 extends Component {
  render() {
    return (
      <Exception type="403" />
    )
  }
}
