'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import initStyles from '../css/init.scss';
import styles from '../css/main.scss';
import Clock from './_clock';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      second: 0
    }
  }
  onClockChange(degree){
    this.setState({second: degree / 6});
  }
  render(){
    return (
      <div className={styles.wrapper}>
        <Clock className={styles.clock} degree={this.state.second * 6} onChangeHandler={d => this.onClockChange(d)}></Clock>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.content')
);
