/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {Table} from 'antd'
import {Link} from 'dva/router'
import styles from './QuestionLevelList.css'

const questionLevelList = [
  {value: 1, text: '读'},
  {value: 2, text: '填空'},
  {value: 3, text: '对话'},
  {value: 4, text: '选择'}];

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
      <Link to={path} query={{type:text.value}}>{text.text}</Link>
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
