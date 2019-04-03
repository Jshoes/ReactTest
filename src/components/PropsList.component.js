import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PropsListItem extends Component {

  render() {
    let {label, children} = this.props
    let {labelSuffix} = this.context
    return (
      <li className="props-item">
        <label className="props-label">{label}{labelSuffix}</label>
        <span className="props-value">{children}</span>
      </li>
    )
  }
}

PropsListItem.contextTypes = {
  labelPosition: PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelSuffix: PropTypes.string
};

class PropsList extends Component {

  getChildContext() {
    return {labelSuffix: this.props.labelSuffix}
  }
  renderItem() {
    let {items, labelSuffix} = this.props
    return items.map((it) => {
      return (
        <PropsListItem key={it.label} label={it.label} labelSuffix={labelSuffix}>{it.value}</PropsListItem>
      )
    })
  }
  render() {
    let {children, items} = this.props
    return (
      <ul className="props-list">
        {items.length > 0
          ? this.renderItem()
          : children}
      </ul>
    )
  }
}

PropsList.childContextTypes = {
  labelPosition: PropTypes.string,
  labelSuffix: PropTypes.string
}

PropsList.propTypes = {
  labelPosition: PropTypes.string,
  labelSuffix: PropTypes.string,
  items: PropTypes.array,
  inline: PropTypes.bool
}

PropsList.defaultProps = {
  labelPosition: 'left',
  labelSuffix: ":",
  items: [],
  inline: true
}

PropsList.Item = PropsListItem

export {PropsListItem}
export default PropsList
