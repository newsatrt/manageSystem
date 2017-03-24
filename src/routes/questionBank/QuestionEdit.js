/**
 * Created by YXH on 2017/3/22 0022.
 */

import React, {Component} from 'react';
import QuestionTemple from '../../components/QuestionBank/Question';
import {connect} from 'dva';

const Question = ({location, dispatch, questions}) => {
  const {pageType, type, question} = questions;
  console.log(questions);

  const addProps = {
    pageType,
    type,
    question,
    addSentence: () => {
      let items = question.items.push({});
      dispatch({type: 'addSentence'},{payload:items})
    }
  };
  const editProps = {
    pageType,
    type,
    question,
    dispatch
  };

  return (
    <QuestionTemple {...addProps} />
  );

}

export default connect(({questions}) => ({questions}))(Question);
