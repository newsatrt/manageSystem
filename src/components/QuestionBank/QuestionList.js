/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {Table, Input,Button} from 'antd'
import {Link} from 'dva/router'
const Search = Input.Search;
import styles from './QuestionList.css'

const data = {
  "total": 2,
  "questions": [
    {
      "id": "\"58d20f6b0fbc9c9ed2771747\"",
      "type": 2,
      "level_ids": [
        "10002"
      ],
      "system_user_id": "1",
      "status": 0,
      name: "这是第一个题目",
      "items": [
        {
          "id": "\"58d20f6b0fbc9c9ed2771746\"",
          "label": "",
          "content": "Where are you from?",
          "blank": [
            0,
            1,
            2,
            3,
            4
          ],
          "translated_content": "你来自哪里？",
          "translated_blank": [
            3,
            4
          ],
          "audio_url": "http:/www.baidu.com",
          "role": "",
          "role_name": "",
          "multi": false,
          "poster": {
            "eimg": "http://www.baidu.com",
            "pimg": "",
            "himg": "",
            "vimg": ""
          },
          "choices": [],
          "options": []
        }
      ]
    },
    {
      "id": "\"58d20b9d0fbc9c9d10e52575\"",
      "type": 1,
      "level_ids": [
        "10001"
      ],
      "system_user_id": "1",
      "status": 0,
      name: "这是第二个题目",
      "items": [
        {
          "id": "\"58d20b9d0fbc9c9d10e52573\"",
          "label": "",
          "content": "Hello world",
          "blank": [],
          "translated_content": "世界你好",
          "translated_blank": [],
          "audio_url": "http:/www.baidu.com",
          "role": "",
          "role_name": "",
          "multi": false,
          "poster": {
            "eimg": "",
            "pimg": "",
            "himg": "",
            "vimg": ""
          },
          "choices": [],
          "options": []
        },
        {
          "id": "\"58d20b9d0fbc9c9d10e52574\"",
          "label": "",
          "content": "Hello are you?",
          "blank": [],
          "translated_content": "你好吗？",
          "translated_blank": [],
          "audio_url": "http:/www.baidu.com",
          "role": "",
          "role_name": "",
          "multi": false,
          "poster": {
            "eimg": "",
            "pimg": "",
            "himg": "",
            "vimg": ""
          },
          "choices": [],
          "options": []
        }
      ]
    }
  ]
}

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
  className: "column"
}, {
  title: '操作',
  key: 'action',
  className: "column",
  render: (text, record) => (
    <span>
      <Link to={path} query={{pageType:'edit'}}>修改</Link>
      <span className="ant-divider" />
      <a href="#">删除</a>
      <span className="ant-divider" />
      <a href="#">预览</a>
    </span>
  ),
}];

const questionList = data.questions;
let dataSource = [];
for (let i = 0, len = questionList.length; i < len; i++) {
  dataSource.push({
    key: i + 1,
    id: questionList[i].id,
    name: questionList[i].name,
    tag: 'tag' + i
  });
}

const path = "question-bank/edit/";

class QuestionList extends Component {
  render() {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.operationBlock}>
          <Button type="primary"><Link to={path} query={{pageType:'add'}}>新增</Link></Button>

          <Search
            placeholder="可根据标签和名称进行查找"
            style={{width: 300,float: 'right'}}
            onSearch={value => console.log(value)}
          />
        </div>
        <Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
      </div>
    );
  }
}

export default QuestionList;
