/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {Table} from 'antd'
import {Link} from 'dva/router'
import styles from './QuestionLevelList.css'
import questionType from '../../utils/questionType'

const questionLevelList = questionType;

const path = "question-bank/question/";

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  className: "column"
}, {
  title: '题型',
  dataIndex: 'level',
  key: 'level',
  className: "column",
  render: (text, record, index) => (
    <span>
      <Link to={path} query={{type:text.type}}>{text.text}</Link>
    </span>
  ),
}];

let dataSource = [];

for (let i = 0, len = questionLevelList.length; i < len; i++) {
  dataSource.push({
    key: i + 1,
    id: i + 1,
    level: questionLevelList[i]
  });
}


class QuestionLevelList extends Component {
  render() {
    return (
      <div className={styles.tableWrapper}>
        <Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
      </div>
    );
  }
}

export default QuestionLevelList;
