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
    dispatch({
      type: 'questions/changeQuestionInfo',
      payload: values,
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

