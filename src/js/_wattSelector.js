import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from '../css/wattSelector.scss';
import WattSelectorButton from './_wattSelectorButton';

console.log(styles);

class WattSelector extends React.Component {
  constructor(){
    super();
    this.state = {
      beforeWatt: 0
    }
  }
  onButtonClickHandler(e, watt){
    if(this.state.beforeWatt == 0){ // 変換元のワットの入力の場合
      this.setState({
        beforeWatt: watt
      });
    }else{ // 変換先ワット数の入力の場合
      console.log(`From ${String(this.state.beforeWatt)} to ${watt}`);
      this.props.onConvertWattHandler(this.state.beforeWatt, watt);
      this.setState({
        beforeWatt: 0
      });
    }
  }
  render(){
    let description;
    this.state.beforeWatt == 0 ? description = `ダイアルで変換元の温め時間を指定、変換元ワット数をタップ`
                               : description = `${String(this.state.beforeWatt)}Wからの変換先ワット数をタップ`;
    return (
      <div className={classnames(styles.wrapper, this.props.className)}>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonWrapper}>
          <WattSelectorButton className={styles.button}
            highlighted={(this.state.beforeWatt == 500)}
            watt={500} onClickHandler={(e, watt) => this.onButtonClickHandler(e, watt)} />
          <WattSelectorButton className={styles.button}
            highlighted={(this.state.beforeWatt == 600)}
            watt={600} onClickHandler={(e, watt) => this.onButtonClickHandler(e, watt)} />
          <WattSelectorButton className={styles.button}
            highlighted={(this.state.beforeWatt == 800)}
            watt={800} onClickHandler={(e, watt) => this.onButtonClickHandler(e, watt)} />
          <WattSelectorButton className={styles.button}
            highlighted={(this.state.beforeWatt == 1000)}
            watt={1000} onClickHandler={(e, watt) => this.onButtonClickHandler(e, watt)} />
        </div>
      </div>
    );
  }
}

export default WattSelector;
