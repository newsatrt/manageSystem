/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {Table} from 'antd'
import styles from './QuestionLevelList.css'

const questionLevelList = ['读', '填空', '对话', '选择'];

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
  render: (text, record) => (
    <span>
      <a href="#">{text}</a>
    </span>
  ),
}];

let dataSource = [];

for (let i = 0, len = questionLevelList.length; i < len; i++) {
  dataSource.push({
    key: i+1,
    id: i+1,
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
