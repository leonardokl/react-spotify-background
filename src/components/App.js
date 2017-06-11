import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Palette from './Palette'
import FitImage from './FitImage'
import { COLOR_PALETTES, IMAGE_URL } from '../constants';
import './App.css'

class App extends Component {
  state = {
    image: IMAGE_URL,
    activePallete: 'vibrant',
  }

  setActivePalette = (activePallete) => (evt) => {
    this.setState({ activePallete })
  }

  handleFileInputChange = (evt) => {
    evt.preventDefault()

    const [file] = evt.target.files
    const reader = new FileReader()

    if (file) {
      reader.onloadend = () => {
        const image = reader.result

        this.setState({ image })
      }

      reader.readAsDataURL(file)
    }
  }

  uploadImage = () => {
    this.fileInput.click()
  }

  render() {
    const { image, activePallete, colorPallete, imageHeight, imageWidth } = this.state

    return (
      <Palette image={image}>
        {palette => (
          <div
            className="app"
            style={{
              backgroundColor: palette[activePallete] || 'black',
              backgroundImage: `linear-gradient(${palette[activePallete] || 'rgb(10, 5, 7)'}, rgb(10, 5, 7) 85%)`
            }}
          >
            <div
              className="app__main"
            >
              <div className="app__main__image">
                <FitImage
                  src={image}
                  onClick={this.uploadImage}
                />
              </div>
              <div
                style={{
                  marginTop: 20
                }}
              >
                {activePallete}
              </div>
              <div className="app__main__palettes">
                {COLOR_PALETTES.map(i => (
                  <div
                    key={i}
                    className={cn('palette', { active: i === activePallete})}
                    style={{
                      backgroundColor: palette[i]
                    }}
                    onClick={this.setActivePalette(i)}
                  />
                ))}
              </div>
            </div>
            <input
              ref={(el) => this.fileInput = el}
              className="file-input"
              type="file" 
              onChange={this.handleFileInputChange}
            />
          </div>
        )}
      </Palette>
    )
  }
}

export default App
