/**
 * Created by YXH on 2017/3/23 0023.
 */
import React from 'react';
import {Button, Icon, Input} from 'antd';
import Sentence from './SentenceEdit';
import ChoiceQuestion from './ChoiceQuestion';

const ChoicesQuestion = ({items, type, addChoices, deleteChoices, addOptions, deleteOptions,
  handleChoicesArticleInfoChange, handleChoicesContentInfoChange,handleChoicesOptionsInfoChange}) => {
  const questionDescribeProps = {
    type: type,
    index: 0,
    handleSentenceInfoChange: handleChoicesArticleInfoChange,
    ...items[0]
  };
  let choices = items[0].choices;

  return (
    <div>
      <div>
        <h4>原文</h4>
        <div>
          <Sentence {...questionDescribeProps}></Sentence>
        </div>
      </div>

      <div>
        <h4>选择题</h4>
        {
          choices && choices.map(function (choice, index) {
            const choiceQuestionProps = {
              type: type,
              index: index,
              choice: choice,
              addOptions,
              deleteOptions,
              handleChoicesContentInfoChange,
              handleChoicesOptionsInfoChange
            };
            return (
              <div style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5px'}} key={index}>
                <ChoiceQuestion {...choiceQuestionProps} key={index}></ChoiceQuestion>
                <Icon type="minus-circle-o" onClick={deleteChoices.bind(null, index)}
                      style={{fontSize: '25px', marginLeft: '10px', cursor: 'pointer'}}/>
              </div>);
          })
        }

        <Button type="dashed" onClick={addChoices}
                style={{width: '60%', margin: '0 auto', display: 'block', cursor: 'pointer'}}>
          <Icon type="plus"/> 添加选择题
        </Button>
      </div>
    </div>
  )
}

export default ChoicesQuestion;
