/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react';
import QuestionListTemple from '../../components/QuestionBank/QuestionList';
import QuestionTemple from '../../components/QuestionBank/Question';
import {connect} from 'dva';

const Question = ({location, dispatch, questions}) => {
  const {pageStatus} = questions;
  const listProps = {

  };
  const addProps = {
    pageStatus:pageStatus
  };
  const editProps = {
    pageStatus:pageStatus
  };
  if(pageStatus == 'list'){
    return (<QuestionListTemple {...listProps} />);
  }else if (pageStatus == 'add'){
    return (<QuestionTemple {...addProps} />);
  }else if (pageStatus == 'edit'){
    return (<QuestionTemple {...editProps} />);
  }else{
    return (<QuestionListTemple {...listProps} />)
  }

}

export default connect(({questions}) => ({questions}))(Question);
