import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import reactCSS from "reactcss";
import { CompactPicker } from "react-color";
import "./App.css";

class App extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    brushRadius: 10,
    lazyRadius: 12,
    displayColorPicker: false,
    displayBrushPicker: false,
    onOffDrawing: true,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
  };

  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: this.state.color,
      });
    }, 2000);
  }

  handleBrush = () => {
    this.setState({
      displayBrushPicker: !this.state.displayBrushPicker,
      displayColorPicker: false,
      onOffDrawing: !this.state.onOffDrawing,
    })
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      displayBrushPicker: false,
      onOffDrawing: !this.state.onOffDrawing,
    });
  };

  handleClose = () => {
    this.setState({
      displayColorPicker: false,
      displayBrushPicker: false,
      onOffDrawing: !this.state.onOffDrawing,
    });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    // displayColorPicker: false,   onOffDrawing: !this.state.onOffDrawing
  };

  inputRang = (e) => {
    this.setState({ brushRadius: e.target.value })
  }

  closeAll = () => {
    this.setState({
      displayColorPicker: false,
      displayBrushPicker: false,
      onOffDrawing: true
    })
  }

  render() {
    const styles = reactCSS({
      default: {
        color: {
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "99999999",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          borderRadius: "50%"
        },
        inputRang: {
          position: "absolute",
          padding: "10px",
          width: "240px",
          top: "15px",
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px",
          borderRadius: '30px',
          background: "rgb(255, 255, 255)",
        }
      },
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <a className="navbar-brand" href="#">
                Drawing
              </a>

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <div className="nav-link">
                    <button type="button" className="btn" style={styles.color} onClick={this.handleClick}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-circle-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15V1a7 7 0 1 1 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                      </svg>
                    </button>

                    {
                      this.state.displayColorPicker ? (
                        <div style={styles.popover}>
                          <div style={styles.cover} onClick={this.handleClose} />
                          <CompactPicker
                            color={this.state.color}
                            onChange={this.handleChange}
                          />
                        </div>
                      ) : null
                    }
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <button type="button" className="btn btn-dark" onClick={this.handleBrush}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-brush-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.117 8.117 0 0 1-3.078.132 3.658 3.658 0 0 1-.563-.135 1.382 1.382 0 0 1-.465-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.393-.197.625-.453.867-.826.094-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.2-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.175-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z" />
                      </svg>
                    </button>

                    {
                      this.state.displayBrushPicker ? (
                        <div style={styles.popover}>
                          <div style={styles.inputRang} >
                            <div className="col text-center">
                              <label for="BrushSize">Size</label>
                              <input type="range" className="custom-range" min="0" max="100" step="0.5" id="BrushSize" value={this.state.brushRadius} onChange={e => this.inputRang(e)} />
                            </div>
                          </div>
                        </div>)
                        : null
                    }

                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row" onMouseOver={this.closeAll}>
          <div style={{ height: window.screen.height }}>
            <div className="w-100 h-100" >
              {this.state.onOffDrawing ? (
                <CanvasDraw
                  canvasWidth={this.state.width}
                  canvasHeight={this.state.height}
                  lazyRadius={this.state.lazyRadius}
                  brushRadius={this.state.brushRadius}
                  brushColor={styles.color.background}
                />
              ) : (
                  <CanvasDraw
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                    lazyRadius={this.state.lazyRadius}
                    brushRadius={this.state.brushRadius}
                    brushColor={this.state.color}
                    disabled
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
