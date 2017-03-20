import React from 'react';
import { connect } from 'dva';
import styles from './Home.css';
import Sentence from '../components/QuestionBank/Sentence';

function Home() {
  return (
    <div className={styles.normal}>
      用户中心
      <Sentence></Sentence>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
