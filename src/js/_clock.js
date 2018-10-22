import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from '../css/clock.scss';

class Clock extends React.Component {
  constructor(){
    super();
    this.state = {
      isTouching: false
    }
    this.clockRef = React.createRef();
  }
  calcDegree(clickedCoordinate){
    const clockRect = this.clockRef.current.getBoundingClientRect();
    const middleCoordinate = {
      x: (clockRect.left + window.pageXOffset) + clockRect.width / 2,
      y: (clockRect.top + window.pageYOffset) + clockRect.height / 2
    }
    // const clickedCoordinate = {
    //   x: e.clientX,
    //   y: e.clientY
    // }
    const relativeClickedCoordinate = {
      x: clickedCoordinate.x - middleCoordinate.x,
      y: clickedCoordinate.y - middleCoordinate.y
    }
    const rate = relativeClickedCoordinate.y / relativeClickedCoordinate.x;

    let degree, b;
    if(rate < 0 && relativeClickedCoordinate.x > 0) b = 0;
    if(rate > 0 && relativeClickedCoordinate.x > 0) b = 90;
    if(rate < 0 && relativeClickedCoordinate.x < 0) b = 180;
    if(rate > 0 && relativeClickedCoordinate.x < 0) b = 270;

    if(relativeClickedCoordinate.y < 0 && relativeClickedCoordinate.x == 0) degree = 0;
    if(relativeClickedCoordinate.x > 0 && relativeClickedCoordinate.y == 0) degree = 90;
    if(relativeClickedCoordinate.y > 0 && relativeClickedCoordinate.x == 0) degree = 180;
    if(relativeClickedCoordinate.x < 0 && relativeClickedCoordinate.y == 0) degree = 270;
    if(typeof degree == 'undefined'){
      if(rate > 0) degree = Math.atan(Math.abs(relativeClickedCoordinate.y) / Math.abs(relativeClickedCoordinate.x)) * 57.2958 + b;
      if(rate < 0) degree = Math.atan(Math.abs(relativeClickedCoordinate.x) / Math.abs(relativeClickedCoordinate.y)) * 57.2958 + b;
    }
    console.log(relativeClickedCoordinate, degree);
    return degree;
  }
  onMouseDown(e){
    this.setState({isTouching: true});
    this.props.onChangeHandler(this.calcDegree({
      x: e.clientX, y: e.clientY
    }));
  }
  onMouseMove(e){
    if(this.state.isTouching) this.props.onChangeHandler(this.calcDegree({
      x: e.clientX, y: e.clientY
    }));
  }
  onMouseUp(e){
    this.setState({isTouching: false});
    this.props.onChangeHandler(this.calcDegree({
      x: e.clientX, y: e.clientY
    }));
  }
  onTouchStart(e){
    this.setState({isTouching: true});
    if(e.touches.length > 0) this.props.onChangeHandler(this.calcDegree({
      x: e.touches[0].clientX, y: e.touches[0].clientY
    }));
  }
  onTouchMove(e){
    if(e.touches.length > 0 && this.state.isTouching) this.props.onChangeHandler(this.calcDegree({
      x: e.touches[0].clientX, y: e.touches[0].clientY
    }));
  }
  onTouchEnd(e){
    this.setState({isTouching: false});
    if(e.touches.length > 0) this.props.onChangeHandler(this.calcDegree({
      x: e.touches[0].clientX, y: e.touches[0].clientY
    }));
  }
  render(){
    const knobDegreeStyle = {
      '--knobDegree': `${String(this.props.degree)}deg`
    }
    return (
      <div className={classnames(styles.wrapper, this.props.className)}
        onMouseDown={(e) => this.onMouseDown(e)}
        onMouseMove={(e) => this.onMouseMove(e)}
        onMouseUp={(e) => this.onMouseUp(e)}
        onTouchStart={(e) => this.onTouchStart(e)}
        onTouchMove={(e) => this.onTouchMove(e)}
        onTouchEnd={(e) => this.onTouchEnd(e)}
        ref={this.clockRef}>
        <div className={classnames(styles.child, styles.knob)} style={knobDegreeStyle}></div>
        <div className={classnames(styles.child, styles.timeMoniter)}></div>
        <div className={classnames(styles.child, styles.clockFace)}></div>
      </div>
    );
  }
}

export default Clock;
