/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react';
import QuestionListTemple from '../../components/QuestionBank/QuestionList';
import QuestionTemple from '../../components/QuestionBank/Question';
import {connect} from 'dva';

const Question = ({location, dispatch, questions}) => {
  const {} = questions;
  const listProps = {

  };

  return (<QuestionListTemple {...listProps} />);

}

export default connect(({questions}) => ({questions}))(Question);
