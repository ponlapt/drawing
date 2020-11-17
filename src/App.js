import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import reactCSS from "reactcss";
import { CirclePicker } from "react-color";
import "./App.css";

class App extends Component {
  state = {
    width: window.screen.height,
    height: window.screen.height,
    brushRadius: 10,
    lazyRadius: 12,
    displayColorPicker: false,
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

  handleClick = () => {
    console.log("handleClick");
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      onOffDrawing: !this.state.onOffDrawing,
    });
  };

  handleClose = () => {
    console.log("handleClose");
    this.setState({
      displayColorPicker: false,
      onOffDrawing: !this.state.onOffDrawing,
    });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb ,displayColorPicker: false,   onOffDrawing: !this.state.onOffDrawing,});
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "50%",
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
          borderRadius:"50%"
        },
      },
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="#">
                Navbar
              </a>
              {/* <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button> */}

              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    <div style={styles.swatch} onClick={this.handleClick}>
                      <div style={styles.color} />
                    </div>
                    {this.state.displayColorPicker ? (
                      <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleClose} />
                        <CirclePicker
                          color={this.state.color}
                          onChange={this.handleChange}
                        />
                      </div>
                    ) : null}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row">
          <div style={{ height: window.screen.height }}>
            <div className="w-100 h-100">
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
