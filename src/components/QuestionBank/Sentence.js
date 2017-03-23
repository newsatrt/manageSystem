import React from 'react';
import './Sentence.css';
import { Icon} from 'antd';
import SentenceEdit from './SentenceEdit';

export default class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
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
      <div>
        {
          this.state.collapsed ? (<div>这里显示题目展示信息</div>):(<SentenceEdit {...this.props}></SentenceEdit>)
        }
        <Icon type={this.state.collapsed ? "up-circle-o" : "down-circle-o"}
              onClick={this.handleFoldSentenceInformation}/>
      </div>
    )
  }
}



