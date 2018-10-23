'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import initStyles from '../css/init.scss';
import styles from '../css/main.scss';
import Dial from './_dial';
import WattSelector from './_wattSelector';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function() { console.log('Service Worker Registered'); });
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      second: 0
    }
  }
  onTimeChange(second){
    this.setState({second: second});
  }
  onConvertWatt(before, after){
    const afterSecond = (before * this.state.second) / after;
    this.setState({
      second: afterSecond
    });
  }
  render(){
    return (
      <div className={styles.wrapper}>
        <div className={classnames(styles.content)}>
          <Dial className={styles.dial} second={this.state.second} onChangeHandler={d => this.onTimeChange(d)} />
          <WattSelector className={styles.wattSelector} onConvertWattHandler={(before, after) => this.onConvertWatt(before, after)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.REACT_COMPONENT_WRAPPER')
);
