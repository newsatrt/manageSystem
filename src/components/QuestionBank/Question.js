import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import styles from './Question.css';
import ConversationsQuestion from './ConversationsQuestion';
import ChoicesQuestion from './ChoicesQuestion';
import questionType from '../../utils/questionType';

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
    if (props.type == 2 && props.question.items) {
      transformContentBlank(props.question.items);
      transformTranslatedContentBlank(props.question.items);
    }
    console.log('处理后的数据: ', props.question);
  };

  const transformContentBlank = (items) => {
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i] && items[i].contentWordList) {
        let content = '';
        let blank = [];
        let blankIndex = -1;
        let contentWordList = items[i].contentWordList;
        for (let j = 0, contentLen = contentWordList.length; j < contentLen; j++) {
          if (contentWordList[j].value) {
            if (j == 0 || contentWordList[j].isSpecialSymbol) {
              content += contentWordList[j].value;
            } else {
              content += ' ' + contentWordList[j].value;
            }

            if (contentWordList[j].isActive) {
              if (j - 1 > -1 && contentWordList[j - 1].isActive) {
                for (let k = blankIndex; k < content.length; k++) {
                  blank.push(k);
                }
              } else {
                for (let k = blankIndex + 1; k < content.length; k++) {
                  blank.push(k);
                }
              }

            }
            blankIndex = content.length;
          }
        }

        items[i].content = content;
        items[i].blank = blank;
      }
    }
  };

  const transformTranslatedContentBlank = (items) => {
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i] && items[i].translatedContentList) {
        let blank = [];
        let translatedContentList = items[i].translatedContentList;
        for (let j = 0, contentLen = translatedContentList.length; j < contentLen; j++) {
          if (translatedContentList[j].isActive) {
            blank.push(j);
          }
        }
        items[i]['translated_blank'] = blank;
      }
    }
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
        handleChoicesOptionsInfoChange: props.handleChoicesOptionsInfoChange,
      };
      return (<ChoicesQuestion {...choiceProps}></ChoicesQuestion>)
    } else {
      const readProps = {
        items: props.question.items,
        roleList: props.question.roleList,
        type: props.type,
        addSentence: props.addSentence,
        deleteSentence: props.deleteSentence,
        addRole: props.addRole,
        deleteRole: props.deleteRole,
        handleSentenceInfoChange: props.handleSentenceInfoChange,
        hanleRoleListChange: props.hanleRoleListChange,
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


