import React,{Component} from 'react'

 class ErrorBoundaryView extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>出错了:</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default(ErrorBoundary) => (InnerComponent) => {
  return class extends Component {
    render() {
      let {children,...otherProps}=this.props

      return (<ErrorBoundaryView {...otherProps} />)
    }
  }
}
