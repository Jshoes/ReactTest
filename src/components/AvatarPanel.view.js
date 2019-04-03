import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ShortCutList from './ShortCutList.view'

export default class AvatarPanel extends Component {
  render() {
    let {item, user} = this.props;
    return (
      <div className="cmp-avatar">
        <div className="cmp-avatar-box" >
          <img  width="100%" height="100%" className="cmp-avatar-img"/>
          <a href="javascript:void(0)" >{user.nickname}</a>
        </div>
        <ul >
          <li>帐号：{user.username}</li>
          <li>包钱：{user.money}元</li>
          <li>等级：{user.level}级</li>
        </ul>
        <div className="cmp-avatar-shortcut">
          <ShortCutList item={item}/>
        </div>
      </div>
    )
  }
}

AvatarPanel.propTypes = {
  user: PropTypes.object,
  item: PropTypes.array
}

AvatarPanel.defaultProps = {
  user: {},
  item: []
}
