import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from '../css/wattSelectorButton.scss';

class WattSelectorButton extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div className={classnames(styles.button, {
          [styles.highlighted]: this.props.highlighted
        }, this.props.className)}
        onClick={e => this.props.onClickHandler(e, this.props.watt)}>
        {`${String(this.props.watt)}W`}
      </div>
    );
  }
}

export default WattSelectorButton;
