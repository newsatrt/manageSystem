import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import styles from './Question.css';

function Question() {
  const columns = [{
    title: '年级',
    dataIndex: 'class',
    width: 150,
  }, {
    title: '教材',
    dataIndex: 'book',
    width: 150,
  }, {
    title: '类型',
    dataIndex: 'address',
  }];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <div className={styles.normal}>
      <div>
        <Table columns={columns} dataSource={data} scroll={{ y: 240 }} />
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Question);
