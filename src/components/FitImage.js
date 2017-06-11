import React, { PureComponent } from 'react';

class FitImage extends PureComponent {
  state = {
    width: '100%',
    height: '100%'
  }

  handleLoad = ({ target: { offsetHeight, offsetWidth } }) => {
    const height = offsetHeight > offsetWidth ? '100%' : undefined
    const width = offsetHeight > offsetWidth ? undefined : '100%'

    this.setState({ height, width});
  }

  render() {
    const { ...otherProps } = this.props;
    const { width, height } = this.state;

    return (
      <img
        {...otherProps}
        style={{ width, height }}
        onLoad={this.handleLoad}
      />
    )
  }
}

export default FitImage;
