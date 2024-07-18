import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    secondsDone: 0,
    isTimerOn: false,
  }

  decrease = () => {
    const {minutes, isTimerOn} = this.state
    if (!isTimerOn && minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  increase = () => {
    const {minutes, isTimerOn} = this.state
    if (!isTimerOn) {
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  tick = () => {
    this.setState(prevState => ({secondsDone: prevState.secondsDone + 1}))
  }

  start = () => {
    const {isTimerOn} = this.state
    if (!isTimerOn) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState({isTimerOn: true})
    }
  }

  pause = () => {
    const {isTimerOn} = this.state
    if (isTimerOn) {
      clearInterval(this.timerId)
      this.setState({isTimerOn: false})
    }
  }

  reset = () => {
    const {isTimerOn} = this.state
    this.setState({minutes: 25, secondsDone: 0, isTimerOn: false})
    if (isTimerOn) {
      clearInterval(this.timerId)
      this.setState({isTimerOn: false})
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, secondsDone} = this.state
    const totalRemainingSeconds = minutes * 60 - secondsDone
    const minutesPart = Math.floor(totalRemainingSeconds / 60)
    const secondsPart = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutesPart > 9 ? minutesPart : `0${minutesPart}`
    const stringifiedSeconds = secondsPart > 9 ? secondsPart : `0${secondsPart}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {minutes, isTimerOn} = this.state
    return (
      <div className="main">
        <div>
          <h1 className="heading">Digital Timer</h1>
        </div>

        <div className="time-container">
          <div className="img-container">
            <div className="time-runner">
              <p className="time">{this.getElapsedSecondsInTimeFormat()}</p>
              <p className=" para set">{isTimerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="button-container">
            <div className="row">
              {isTimerOn ? (
                <div className="side">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="img"
                  />
                  <button type="button" onClick={this.pause} className="btn">
                    Pause
                  </button>
                </div>
              ) : (
                <div className="side">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="img"
                  />
                  <button type="button" onClick={this.start} className="btn">
                    Start
                  </button>
                </div>
              )}

              <div className="side">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="img"
                />
                <button type="button" onClick={this.reset} className="btn">
                  Reset
                </button>
              </div>
            </div>

            <p className="set">Set Timer limit</p>
            <div className="side1">
              <button
                type="button"
                onClick={this.decrease}
                className="btn btn1"
              >
                -
              </button>
              <p className="btn-type">{minutes}</p>
              <button
                type="button"
                onClick={this.increase}
                className="btn btn1"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
