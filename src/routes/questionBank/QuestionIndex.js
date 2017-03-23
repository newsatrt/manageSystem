import React from 'react';
import {connect} from 'dva'
import styles from './QuestionIndex.css';

function QuestionIndex({children}) {
  return (
    <div className={styles.normal}>
      {children}
    </div>
  );
}

export default connect()(QuestionIndex);

