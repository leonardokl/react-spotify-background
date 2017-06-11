import React, { PureComponent } from 'react'
import * as Vibrant from 'node-vibrant'
import camelCase from 'lodash/camelCase'

function getImagePalette(url) {
  return Vibrant.from(url).getPalette()
      .then(response => {
        const keys = Object.keys(response);
        const colorPallete = keys.reduce((acc, paletteName) => ({
          ...acc,
          [camelCase(paletteName)]: response[paletteName] && response[paletteName].getHex()
        }), {})
        const vibrantCanvas = document.querySelector('.vibrant-canvas')

        if (vibrantCanvas) {
          vibrantCanvas.remove()
        }

        return colorPallete
      })
}

class Palette extends PureComponent {
  state = {
    palette: {},
    loaded: false,
    error: false
  }

  updatePalette = (image) => {
    getImagePalette(image)
      .then(palette => this.setState({ palette, loaded: true }))
      .catch(error => this.setState({ palette: {}, loaded: true, error }));
  }

  componentDidMount() {
    this.updatePalette(this.props.image)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.updatePalette(nextProps.image)
    }
  }

  render() {
    const { children, ...otherProps } = this.props
    const { palette, loaded } = this.state

    return loaded && children(palette)
  }
}

export default Palette
