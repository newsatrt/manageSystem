/**
 * Created by YXH on 2017/3/23 0023.
 */
import React,{Component} from 'react';
import {Button,Icon} from 'antd';
import Sentence from './Sentence';

class ConversationsQuestion extends Component {
  constructor(props){
    super(props);
    console.log('ConversationsQuestion ~~~~~~~~~~~',props);
    this.state = {

    }
  }

  render(){
    return (
      <div>
        <div>
          这里需要添加角色
        </div>

        {
          this.props.items.map(function(item,index){
            const itemProps = {
              type: this.props.type,
              ...item
            };
            return (<Sentence {...itemProps} key={index}></Sentence>);

          },this)
        }

        <Button type="dashed" onClick={this.props.addSentence} style={{ width: '60%',display:'block',margin:'0 auto' }}>
          <Icon type="plus" /> 添加
        </Button>
      </div>
    )
  }
}

export default ConversationsQuestion;
