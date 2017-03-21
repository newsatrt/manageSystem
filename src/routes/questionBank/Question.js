import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import QuestionTemplate from '../../components/QuestionBank/Question';
import styles from './Question.css';

function Question() {
  return (
    <div className={styles.normal}>
      <QuestionTemplate></QuestionTemplate>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Question);
