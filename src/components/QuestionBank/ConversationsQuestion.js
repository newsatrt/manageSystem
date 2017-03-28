/**
 * Created by YXH on 2017/3/23 0023.
 */
import React, {Component} from 'react';
import {Button, Icon, Input,Popconfirm,message } from 'antd';
import Sentence from './SentenceEdit';

const ConversationsQuestion = ({items, roleList, type, addSentence, deleteSentence, addRole, deleteRole, handleSentenceInfoChange, hanleRoleListChange}) => {
  const onRoleListChange = (index, role, event) => {
    role.value = event.currentTarget.value;
    hanleRoleListChange(index, role);
  };

  return (
    <div>
      {
        type == 4 ? (<div >
            <div style={{display: 'flex', alignItems: 'top'}}>
              <label style={{paddingLeft: '15px'}}>角色：</label>
              <div style={{width: '100%', flex: 1}}>
                {
                  roleList && roleList.map(function (role, index) {
                    return (
                      <div key={index}
                           style={{display: 'flex', alignItems: 'center', width: '50%', marginBottom: '5px'}}>
                        <Input key={index} value={role.value} onChange={onRoleListChange.bind(this, index, role)}
                               style={{width: '100%', flex: 1}} placeholder="请输入角色名称，如：LiLei"/>
                        <Popconfirm title="是否确认删除该角色?" onConfirm={deleteRole.bind(null,index)} okText="删除" cancelText="返回">
                          <Icon type="minus-circle-o" style={{fontSize: '17px', marginLeft: '10px', cursor: 'pointer'}}/>
                        </Popconfirm>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            <Button type="dashed" onClick={addRole}
                    style={{width: '60%', display: 'block', margin: '0 auto', cursor: 'pointer', marginBottom: '10px'}}>
              <Icon type="plus"/> 添加角色
            </Button>
          </div>) : ('')
      }

      {
        items && items.map(function (item, index) {
          const itemProps = {
            type: type,
            handleSentenceInfoChange,
            roleList: roleList,
            index: index,
            ...item
          };
          return (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <Sentence {...itemProps} key={index}></Sentence>
              <Icon type="minus-circle-o" onClick={deleteSentence.bind(null, index)}
                    style={{fontSize: '25px', marginLeft: '10px', cursor: 'pointer'}}/>
            </div>);
        })
      }

      <Button type="dashed" onClick={addSentence}
              style={{width: '60%', display: 'block', margin: '0 auto', cursor: 'pointer'}}>
        <Icon type="plus"/> 添加
      </Button>
    </div>
  )
};

export default ConversationsQuestion;
