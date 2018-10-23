import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from '../css/dial.scss';

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
    return degree;
  }
  snapSecond(second){
    const snapArray = [0, 10, 20, 30, 40, 50, 60];
    let l = 0;
    while(l < snapArray.length){
      if(Math.abs((second % 60) - snapArray[l]) < 2) return second - ((second % 60) - snapArray[l]);
      l++;
    }
    return second;
  }
  onMouseDown(e){
    this.setState({isTouching: true});
    let second = this.calcDegree({
      x: e.clientX, y: e.clientY
    }) / 6 + Math.floor(this.props.second / 60) * 60;
    this.lastSecond = second;
    this.props.onChangeHandler(second);
  }
  onMouseMove(e){
    if(this.state.isTouching){
      let second = this.calcDegree({
        x: e.clientX, y: e.clientY
      }) / 6 + Math.floor(this.props.second / 60) * 60;
      // 秒の繰り上がり
      if(this.lastSecond % 60 >= 45 && this.lastSecond % 60 < 60 && second % 60 >= 0  && second % 60 < 15) second += 60;
      // 秒の繰り下がり
      if(this.lastSecond % 60 >= 0  && this.lastSecond % 60 < 15 && second % 60 >= 45 && second % 60 < 60 && Math.floor(this.lastSecond / 60) > 0) second -= 60;
      this.lastSecond = second;
      this.props.onChangeHandler(second);
    }
  }
  onMouseUp(e){
    this.setState({isTouching: false});
    let second = this.calcDegree({
      x: e.clientX, y: e.clientY
    }) / 6 + Math.floor(this.props.second / 60) * 60;
    second = this.snapSecond(second);
    this.lastSecond = second;
    this.props.onChangeHandler(second);
  }
  onTouchStart(e){
    this.setState({isTouching: true});
    let second = this.calcDegree({
      x: e.touches[0].clientX, y: e.touches[0].clientY
    }) / 6 + Math.floor(this.props.second / 60) * 60;
    this.lastSecond = second;
    this.props.onChangeHandler(second);
  }
  onTouchMove(e){
    if(this.state.isTouching){
      let second = this.calcDegree({
        x: e.touches[0].clientX, y: e.touches[0].clientY
      }) / 6 + Math.floor(this.props.second / 60) * 60;
      // 秒の繰り上がり
      if(this.lastSecond % 60 >= 45 && this.lastSecond % 60 < 60 && second % 60 >= 0  && second % 60 < 15) second += 60;
      // 秒の繰り下がり
      if(this.lastSecond % 60 >= 0  && this.lastSecond % 60 < 15 && second % 60 >= 45 && second % 60 < 60 && Math.floor(this.lastSecond / 60) > 0) second -= 60;
      this.lastSecond = second;
      this.props.onChangeHandler(second);
    }
  }
  onTouchEnd(e){
    this.setState({isTouching: false});
    if(e.touches.length > 0){
      let second = this.calcDegree({
      x: e.touches[0].clientX, y: e.touches[0].clientY
      }) / 6 + Math.floor(this.props.second / 60) * 60;
      second = this.snapSecond(second);
      this.lastSecond = second;
      this.props.onChangeHandler(second);
    }else{
      let second = this.snapSecond(this.lastSecond);
      this.props.onChangeHandler(second);
    }
  }
  render(){
    const knobDegreeStyle = {
      '--knobDegree': `${String(this.props.second * 6)}deg`
    }
    const timeString = `${String(Math.floor(this.props.second / 60))}:${String(Math.round(this.props.second % 60)).padStart(2, '0')}`
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
        <div className={classnames(styles.child, styles.timeMoniter)}>{timeString}</div>
        <div className={classnames(styles.child, styles.dialFace)}></div>
      </div>
    );
  }
}

export default Clock;
