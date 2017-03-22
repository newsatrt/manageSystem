/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {Table, Input} from 'antd'
const Search = Input.Search;
import styles from './QuestionList.css'

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  className: "column"
}, {
  title: '题目名称',
  dataIndex: 'name',
  key: 'name',
  className: "column"
}, {
  title: '标签',
  dataIndex: 'tag',
  key: 'tag',
  render: (text) => {
    return (
      <span>
        <a href="#">{text}</a>
      </span>
    )
  },
}, {
  title: '操作',
  key: 'action',
  className: "column",
  render: (text, record) => (
    <span>
      <a href="#">修改</a>
      <span className="ant-divider" />
      <a href="#">删除</a>
      <span className="ant-divider" />
      <a href="#">预览</a>
    </span>
  ),
}];

let dataSource = [];

for (let i = 0, len = questionLevelList.length; i < len; i++) {
  dataSource.push({
    key: i + 1,
    id: i + 1,
    name: 'name' + i,
    tag: 'tag' + i
  });
}


class QuestionList extends Component {
  render() {
    return (
      <div className={styles.tableWrapper}>
        <div>
          <button type="primary">新增</button>

          <Search
            placeholder="可根据标签和名称进行查找"
            style={{width: 200}}
            onSearch={value => console.log(value)}
          />
        </div>
        <Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
      </div>
    );
  }
}

export default QuestionList;
