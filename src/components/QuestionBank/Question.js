import React, {Component} from 'react';
import {
  Form, Select, Input, Switch, Radio,
  Slider, Button, Upload, Icon,
} from 'antd';
const FormItem = Form.Item;
import styles from './Question.css';
import ConversationsQuestion from './ConversationsQuestion';
import ChoicesQuestion from './ChoicesQuestion';

class Question extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: `${props.pageType === 'add' ? '添加' : '编辑'}题目`,
      visible: false,
      readProps: {
        items: props.question.items,
        type: 4,
        addSentence: props.addSentence
      }
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
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const handleQuestionContent = (props) => {
      console.log('now is read question', props.type);

      if (props.type == 5) {
        const choiceProps = {
          items: props.question.items,
          type: props.type
        };
        console.log('now is choice question');
        return (<ChoicesQuestion {...choiceProps}></ChoicesQuestion>)
      }  else {
        const readProps = {
          items: props.question.items,
          type: props.type
        };
        console.log('now is read question');
        return (<ConversationsQuestion {...readProps}></ConversationsQuestion>)
      }
    };

    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>
          {this.state.title}
        </h4>
        <Form >
          <FormItem
            {...formItemLayout}
            label="题目"
          >
            <Input/>
          </FormItem>

          {handleQuestionContent(this.props)}


          <FormItem wrapperCol={{span: 12, offset: 6}} className={styles.buttonBlock}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            <Button type="primary" onClick={this.handleSubmit}>复用</Button>
            <Button >返回</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Question);

