/**
 * Created by YXH on 2017/3/22 0022.
 */
import React, {Component} from 'react'
import {connect} from 'dva';
import {Table, Input, Button, Pagination, Popconfirm} from 'antd'
import {Link, routerRedux} from 'dva/router'
import {PAGE_SIZE} from '../../constants';
import styles from './QuestionList.css'

const Search = Input.Search;
const path = "question-bank/edit/";

function QuestionList({dispatch, list: dataSource, loading, total, page: current, type, questionInit}) {
  function deleteHandler(id) {
    dispatch({
      type: 'questions/remove',
      payload: id,
    });
  }

  /**
   * 切换页面
   * */
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/questions',
      query: {page},
    }));
  }

  function editHandler(values) {
    let questionData = handleQuestionData(values);
    dispatch({
      type: 'questions/changeQuestionInfo',
      payload: questionData,
    });
  }

  function createHandler(type) {
    let questionData = initQuestionData(type);
    dispatch({
      type: 'questions/changeQuestionInfo',
      payload: questionData
    });
  }

  function initQuestionData(type) {
    for (let i = 0, len = questionInit.length; i < len; i++) {
      if (type == questionInit[i].type) {
        return questionInit[i];
      }
    }
    return {};
  }

  function handleQuestionData(values){
    if(values.type == 2){
      transformListFromContentBlank(values.items);
      transformTranslatedListFromContentBlank(values.items);
    }else if(values.type == 4){
      let roleList = [];
      let roleKeyCache = {};
      if(values.items){
        for(let i=0;i<values.items.length;i++){
          if(!roleKeyCache[values.items[i].role]){
            roleList.push({key:values.items[i].role,value:values.items[i]['role_name']});
            roleKeyCache[values.items[i].role] = 1;
          }
        }
        roleList = roleList.sort(function (a,b) {
          return a.key > b.key;
        });
        values.roleList = roleList;
      }
    }
    return values;
  }

  const transformListFromContentBlank = (items) => {
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i] && items[i].blank && items[i].blank.length > 0) {
        const tempWordList = items[i].content.split(' ');
        let wordList = [];
        let blankIndex = 0;
        for (let j = 0, len = tempWordList.length; j < len; j++) {
          //只处理最简单的情况,结尾是标点
          if (tempWordList[j].length > 1 && /\W/.test(tempWordList[j].substring(tempWordList[j].length - 1))) {
            if(items[i].blank.includes(blankIndex)){
              wordList.push({
                value: tempWordList[j].substring(0, tempWordList[j].length - 1),
                isActive: true
              });
            }else{
              wordList.push({
                value: tempWordList[j].substring(0, tempWordList[j].length - 1),
                isActive: false
              });
            }

            wordList.push({
              value: tempWordList[j].substring(tempWordList[j].length - 1),
              isActive: false,
              isSpecialSymbol: true
            });
          } else {
            if(items[i].blank.includes(blankIndex)){
              wordList.push({
                value: tempWordList[j],
                isActive: true
              });
            }else{
              wordList.push({
                value: tempWordList[j],
                isActive: false
              });
            }
          }
          blankIndex += tempWordList[j].length + 1;
        }
        items[i].contentWordList = wordList;
      }
    }
  };
  const transformTranslatedListFromContentBlank = (items) => {
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i] && items[i]['translated_blank'] && items[i]['translated_blank'].length > 0) {
        const tempWordList = items[i]['translated_content']?items[i]['translated_content'].split(''):[];
        let wordList = [];
        for (let j = 0, len = tempWordList.length; j < len; j++) {
          if(items[i]['translated_blank'].includes(j)){
            wordList.push({
              value: tempWordList[j],
              isActive: true
            })
          }else{
            wordList.push({
              value: tempWordList[j],
              isActive: false
            })
          }
        }
        items[i].translatedContentList = wordList;
      }
    }
  };
  const columns = [
    {
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
          <Link to={path} query={{pageType: 'edit', type: type}} onClick={editHandler.bind(null,text)}>修改</Link>
          <hr className="ant-divider"/>
          <Popconfirm title="确定要删除该题目?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="#">删除</a>
          </Popconfirm>
          <hr className="ant-divider"/>
          <a href="#">预览</a>
    </span>
      ),
    }
  ];

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.operationBlock}>
        <Button type="primary"><Link to={path} query={{pageType: 'add', type: type}}
                                     onClick={createHandler.bind(this, type)}>新增</Link></Button>
        <Search
          placeholder="可根据标签和名称进行查找"
          style={{width: 300, float: 'right'}}
          onSearch={value => console.log(value)}
        />
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const {list, total, page, type, questionInit} = state.questions;
  return {
    loading: state.loading.models.questions,
    list,
    total,
    page,
    type,
    questionInit
  };
}

export default connect(mapStateToProps)(QuestionList);

