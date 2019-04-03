
import React, {Component, PropTypes} from 'react'
import {IframePage} from 'components/Page'

export default class IframeView extends Component {

  render() {
    var source={
        "zhaopin":"https://jobads.zhaopin.com/Position/PositionAdd",
        "51job":"https://ehire.51job.com/Jobs/JobEdit.aspx?Mark=New",
        "58":"https://employer.58.com/postposition"
    }
    let {children,router:{params}} = this.props
    var type=params.type
    var src=source[type]
    return (
        <IframePage src={src} name="IframePage">111</IframePage>
    )
  }
}
