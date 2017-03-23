import React, {Component} from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,
} from 'antd';
import { QUESTION_TYPE } from '../../constants';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  };

  render() {

    return (
      <div onSubmit={this.handleSubmit}>
        <h4>
          {this.props.pageStatus === 'edit'?'编辑':'添加'}{QUESTION_TYPE[this.props.type]}题目
        </h4>

        <div>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
          <Button type="primary" onClick={this.handleSubmit}>复用</Button>
          <Button >返回</Button>
        </div>
      </div>
    );
  }
}

export default Question;

