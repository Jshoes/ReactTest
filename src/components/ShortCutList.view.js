/**
 * @Author: jaxchow
 * @Date:   2017-07-06T11:47:50+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2017-09-28T10:12:59+08:00
 * @Description: 快捷入口应用组件
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

var styles={
  cmpShortcut:{
    margin:0,
    padding:0,
  },
  listItem:{
    float: 'left',
    textAlign: 'center',
    height: '40px',
    lineHeight: '0px',
    color: '#666',
    fontSize: '13px',
    margin:'5px',
    listStyleType:'none'
  },
  listItemIcon:{
    display: 'block',
    fontSize: '24px',
    marginBottom: '15px',
    color: '#8492a6',
  },
  itemLink:{
    textDecoration: 'none',
  }
}

export default class ShortCutList extends Component {
  renderItem() {
    let {item} = this.props;
    return item.map((it) => {
      return (
        <li key={it.icon} style={styles.listItem}>
          <a href={it.href} style={styles.itemLink}>
            <Icon name={it.icon} style={styles.listItemIcon}/>{it.text}
          </a>
        </li>
      )
    })
  }
  render() {
    let {style} = this.props;
    return (
      <ul className="cmp-shortcut" style={styles.cmpShortcut}>
        {this.renderItem()}
      </ul>
    )
  }
}

ShortCutList.propTypes = {
  item: PropTypes.array
}

ShortCutList.defaultProps = {
  item: []
}
