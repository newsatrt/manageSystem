import React, {Component} from 'react';
import {
  Form, Select, Input, Switch, Radio,
  Slider, Button, Upload, Icon,
} from 'antd';
import styles from './Question.css';
import ConversationsQuestion from './ConversationsQuestion';
import ChoicesQuestion from './ChoicesQuestion';
import questionType from '../../utils/questionType'

const FormItem = Form.Item;
const typeList = questionType;

const transformQuestionTypeToText = (type) => {
  for (let i = 0, len = typeList.length; i < len; i++) {
    if (type == typeList[i].type) {
      return typeList[i].text;
    }
  }
  return "未知";
};

const Question = (props) => {

  const handleSubmit = () => {
    //处理需要提交的数据，以及验证信息
    console.log('Received values of form: ', props.question);
  };

  const handleQuestionContent = () => {
    if (props.type == 5) {
      const choiceProps = {
        items: props.question.items,
        type: props.type,
        addChoices: props.addChoices,
        deleteChoices: props.deleteChoices,
        addOptions: props.addOptions,
        deleteOptions: props.deleteOptions,
        handleChoicesArticleInfoChange: props.handleChoicesArticleInfoChange,
        handleChoicesContentInfoChange: props.handleChoicesContentInfoChange,
        handleChoicesOptionsInfoChange: props.handleChoicesOptionsInfoChange
      };
      return (<ChoicesQuestion {...choiceProps}></ChoicesQuestion>)
    } else {
      const readProps = {
        items: props.question.items,
        roleList: props.question.roleList,
        type: props.type,
        addSentence: props.addSentence,
        deleteSentence:props.deleteSentence,
        addRole:props.addRole,
        deleteRole:props.deleteRole,
        handleSentenceInfoChange:props.handleSentenceInfoChange,
        hanleRoleListChange:props.hanleRoleListChange,
      };
      return (<ConversationsQuestion {...readProps}></ConversationsQuestion>)
    }
  };

  const onQuestionNameChange = (event) => {
    props.handleQuestionNameChange({name: event.currentTarget.value});
  };

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>
        {`${props.pageType === 'add' ? '添加' : '编辑'}${transformQuestionTypeToText(props.type)}类型题目`}
      </h4>
      <Form className={styles.content}>
        <FormItem className={styles.row} label="题目">
          <Input value={props.question.name} onChange={onQuestionNameChange.bind(this)}/>
        </FormItem>

        {handleQuestionContent()}

        <FormItem className={styles.buttonBlock}>
          <Button type="primary" onClick={handleSubmit}>保存</Button>
          {/*<Button type="primary">复用</Button>*/}
          <Button >返回</Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default Form.create()(Question);


