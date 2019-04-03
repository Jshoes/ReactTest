import React,{Component} from 'react'
import {Link} from 'react-router'
import PropTypes from 'prop-types'

export default class SmartLink extends Component{

  static contextTypes = {
      router: PropTypes.object,
  }

  constructor(props,context) {
    super(props,context)
  }
  handleClick(event) {

    const props = this.props
    if (this.props.onClick)
      this.props.onClick(event)

    if (event.defaultPrevented)
      return

    const { router } = this.context
    invariant(
      router,
      '<Link>s rendered outside of a router context cannot navigate.'
    )

    if (isModifiedEvent(event) || !isLeftClickEvent(event))
      return

    // If target prop is set (e.g. to "_blank"), let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if(this.props.target =='tabs'){
      console.log(props.href)
      // window.parent.addTabs()
      event.preventDefault()
    }
    if (this.props.target)
      return

    event.preventDefault()

    router.push(resolveToLocation(this.props.to, router))
  }
  resolveToLocation(to, router){
    // console.log(router,'router')
    if(typeof(to)=== 'string' && !/^\//.test(to)){
      return [router.location.pathname,to].join("/")
    }

    if(typeof(to) === 'object' && !/^\//.test(to.pathname)){
      to.pathname=[router.location.pathname,to.pathname].join("/")
    }

    return typeof to === 'function' ? to(router.location) : to
  }

  render() {
    const { to, activeClassName, activeStyle, onlyActiveOnIndex, ...props } = this.props

    // Ignore if rendered outside the context of router to simplify unit testing.
    const { router } = this.context
    // console.log(props,router)
    if (router) {
      // If user does not specify a `to` prop, return an empty anchor tag.
      if (!to) { return <a {...props} /> }

      const toLocation = this.resolveToLocation(to, router)
      props.href = router.createHref(toLocation)
    }

    return  React.createElement(Link,Object.assign({},props),props.children)
  }
}
