/**
 * Created by YXH on 2017/3/22 0022.
 */

import React, {Component} from 'react';
import QuestionTemple from '../../components/QuestionBank/Question';
import {connect} from 'dva';

const Question = ({location, dispatch, questions}) => {
  const {pageType, type, question} = questions;
  const letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'F', 'I', 'J', 'K', 'L', 'M', 'N'];

  const questionProps = {
    pageType,
    type,
    question,
    addSentence: () => {
      question.items.push({label: question.items.length + 1});
      dispatch({type: 'questions/changeSentence', payload: question})
    },
    deleteSentence: (index) => {
      question.items.splice(index, 1);
      //重新计算Key
      for (let i = index, len = question.items.length; i < len; i++) {
        question.items[i].label = i + 1;
      }
      dispatch({type: 'questions/changeSentence', payload: question})
    },
    addRole: () => {
      question.roleList = question.roleList || [];
      question.roleList.push({key: letterList[question.roleList.length], value: ''});
      dispatch({type: 'questions/changeRoleList', payload: question})
    },
    deleteRole: (index) => {
      let roleList = question.roleList || [];
      roleList.splice(index, 1);
      //重新计算Key
      for (let i = index, len = roleList.length; i < len; i++) {
        roleList[i].key = letterList[i];
      }
      dispatch({type: 'questions/changeRoleList', payload: question})
    },
    hanleRoleListChange: (index, data) => {
      let roleList = question.roleList || [];
      roleList[index] = data;
      dispatch({type: 'questions/changeRoleList', payload: question});
    },

    handleSentenceInfoChange: (index, type, data) => {
      question.items[index] = {...question.items[index], ...data};
      console.log('handleSentenceInfoChange component~~~', question);
      dispatch({type: 'questions/changeQuestionInfo', payload: question});
    },
    addChoices: () => {
      question.items[0].choices.push({
        label: question.items[0].choices.length + 1,
        options: [{label: 'A'}]
      });
      dispatch({type: 'questions/changeSentence', payload: question})
    },
    deleteChoices: (index) => {
      question.items[0].choices.splice(index, 1);
      for (let i = index, len = question.items[0].choices.length; i < len; i++) {
        question.items[0].choices[i].label = i + 1;
      }
      dispatch({type: 'questions/changeSentence', payload: question});
    },
    addOptions: (choicesIndex) => {
      let options = question.items[0].choices[choicesIndex].options;
      options.push({label: letterList[options.length]});
      dispatch({type: 'questions/changeSentence', payload: question})
    },
    deleteOptions: (choicesIndex, optionsIndex) => {
      let options = question.items[0].choices[choicesIndex].options;
      options.splice(optionsIndex, 1);
      //重新计算label
      for (let i = optionsIndex, len = options.length; i < len; i++) {
        options[i].label = letterList[i];
      }
      dispatch({type: 'questions/changeSentence', payload: question});
    },
    handleChoicesArticleInfoChange: (index, type, data) => { //题干
      question.items[0] = {...question.items[0], ...data};
      dispatch({type: 'questions/changeQuestionInfo', payload: question});
    },
    handleChoicesContentInfoChange: (index, type, data) => { //选择题
      question.items[0].choices[index] = {...question.items[0].choices[index], ...data};
      dispatch({type: 'questions/changeQuestionInfo', payload: question});
    },
    handleChoicesOptionsInfoChange: (index, type, data, choicesIndex) => { //选择题
      question.items[0].choices[choicesIndex].options[index] = {...question.items[0].choices[choicesIndex].options[index], ...data};
      dispatch({type: 'questions/changeQuestionInfo', payload: question});
    },
    handleQuestionNameChange: (name) => {
      dispatch({type: 'questions/changeQuestionInfo', payload: {...question, ...name}});
    }
  };

  return (
    <QuestionTemple {...questionProps} />
  );
}

export default connect(({questions}) => ({questions}))(Question);
