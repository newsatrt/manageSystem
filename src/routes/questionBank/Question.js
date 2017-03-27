/**
 * Created by YXH on 2017/3/22 0022.
 */
import React from 'react';
import QuestionListTemple from '../../components/QuestionBank/QuestionList';
import {connect} from 'dva';

const Question = () => {
  return (<QuestionListTemple/>);
};

export default connect()(Question);
