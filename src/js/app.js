'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import initStyles from '../css/init.scss';
import styles from '../css/main.scss';
import Clock from './_clock';

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
  onClockChange(second){
    this.setState({second: second});
  }
  render(){
    return (
      <div className={styles.wrapper}>
        <Clock className={styles.clock} second={this.state.second} onChangeHandler={d => this.onClockChange(d)}></Clock>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.content')
);
