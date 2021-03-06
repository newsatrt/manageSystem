import React from 'react';
import styles from './Sentence.css';
import { Icon} from 'antd';
import SentenceEdit from './SentenceForm';

export default class Sentence extends React.Component {
  constructor(props) {
    super(props);
    console.log('Sentence props' ,props);
    this.state = {
      collapsed: false,
    };

    this.handleFoldSentenceInformation = this.handleFoldSentenceInformation.bind(this);
  };

  handleFoldSentenceInformation = () => {
    this.setState({
      ...this.state,
      collapsed: !this.state.collapsed
    })
  };

  render() {
    return (
      <div className={styles.wrapper}>
        {
          this.state.collapsed ? (<div>这里显示题目展示信息</div>):(<SentenceEdit {...this.props}></SentenceEdit>)
        }
        <Icon type={this.state.collapsed ? "up-circle-o" : "down-circle-o"} className={styles.fold}
              onClick={this.handleFoldSentenceInformation}/>
      </div>
    )
  }
}



