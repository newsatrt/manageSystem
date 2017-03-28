import React from 'react';
import styles from './SentenceEdit.css';
import OperationBlock from './OperationBlock';
import {Input, Select, Button, Icon, Upload, message, Form} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const Sentence = ({
  content, type, index, "translated_content":translatedContent, contentWordList, translatedContentList, roleList, poster,
  handleSentenceInfoChange, choiceIndex, sentenceType, role, "role_name":roleName, 'is_answer': isAnswer, handleAnswerChange,
  'audio_url':audioUrl
}) => {
  /*const getBase64 = (img, callback) => {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
   };*/

  const props = {
    name: 'ant-upload',
    action: 'http://192.168.102.107:14500/Oper/upload_file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        centralizeSentenceInfoChange(index, type, {'audio_url': info.file.response.url});
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file){
      if (file.status === "removed") {
        centralizeSentenceInfoChange(index, type, {'audio_url': ''});
        return true;
      } else if (file.status === 'error') {
        message.error(`${info.file.name} file remove failed.`);
        return false;
      }
    }
  };

  const imageProps = {
    className: "avatar-uploader",
    name: "ant-upload",
    showUploadList: false,
    action: "http://192.168.102.107:14500/Oper/upload_file",
    onChange(info) {
      if (info.file.status === 'done') {
        centralizeSentenceInfoChange(index, type, {
          poster: {eimg: info.file.response.url}
        })
      }
    }
  };

  const centralizeSentenceInfoChange = (index, type, data) => {
    if (sentenceType == 'optionSentence') {
      handleSentenceInfoChange(index, type, data, choiceIndex)
    } else {
      handleSentenceInfoChange(index, type, data)
    }
  };
  const handleContentChange = (event) => {
    if (type != 2) {
      centralizeSentenceInfoChange(index, type, {content: event.target.value});
    } else {
      const tempWordList = event.target.value.split(' ');
      let wordList = [];
      for (let i = 0, len = tempWordList.length; i < len; i++) {
        //只处理最简单的情况,结尾是标点
        if (tempWordList[i].length > 1 && /\W/.test(tempWordList[i].substring(tempWordList[i].length - 1))) {
          wordList.push({
            value: tempWordList[i].substring(0, tempWordList[i].length - 1),
            isActive: false
          });
          wordList.push({
            value: tempWordList[i].substring(tempWordList[i].length - 1),
            isActive: false,
            isSpecialSymbol: true
          });
        } else {
          wordList.push({
            value: tempWordList[i],
            isActive: false
          });
        }
      }
      centralizeSentenceInfoChange(index, type, {
        content: event.target.value,
        contentWordList: wordList
      });
    }
  };

  const handleTranslatedContentChange = (event) => {
    if (type != 2) {
      centralizeSentenceInfoChange(index, type, {'translated_content': event.target.value});
    } else {
      const value = event.target.value != null ? event.target.value : '';
      const tempWordList = Array.from(value.trim());
      let wordList = [];
      for (let i = 0, len = tempWordList.length; i < len; i++) {
        wordList.push({
          value: tempWordList[i],
          isActive: false
        })
      }
      centralizeSentenceInfoChange(index, type, {
        'translated_content': event.target.value,
        translatedContentList: wordList
      });
    }
  };
  const switchContentFillItemStatus = (fillItemIndex) => {
    contentWordList[fillItemIndex].isActive = !contentWordList[fillItemIndex].isActive;
    centralizeSentenceInfoChange(index, type, {contentWordList: contentWordList});
  };
  const switchTranslatedFillItemStatus = (fillItemIndex) => {
    translatedContentList[fillItemIndex].isActive = !translatedContentList[fillItemIndex].isActive;
    centralizeSentenceInfoChange(index, type, {translatedContentList: translatedContentList});
  };

  const onRoleChange = (roleList, value) => {
    let roleName = '';
    for (let i = 0, len = roleList.length; i < len; i++) {
      if (value == roleList[i].key) {
        roleName = roleList[i].value;
      }
    }
    let roleObj = {
      role: value,
      "role_name": roleName
    };

    centralizeSentenceInfoChange(index, type, roleObj);
  };

  return (
    <div className={styles.wrapper}>
      {type == 4 && roleList && roleList.length > 0 ? (
          <FormItem className={styles.row} label="角色">
            <Select value={role} style={{width: 80}} onChange={onRoleChange.bind(this, roleList)}>
              {
                roleList.map(function (roleItem, roleIndex) {
                  return (<Option value={roleItem.key} key={roleIndex}>{roleItem.value}</Option>)
                })
              }
            </Select>
          </FormItem>
        ) : ('')}
      <FormItem className={styles.row}
                label="英文">
        <Input placeholder="请输入英文" onChange={handleContentChange.bind(this) } value={content}/>
      </FormItem>
      {type == 2 ? (
          <OperationBlock wordList={contentWordList}
                          handleWordItem={switchContentFillItemStatus}></OperationBlock>) : ('')}
      <FormItem className={styles.row}
                label="中文">
        <Input placeholder="请输入中文" value={translatedContent} onChange={handleTranslatedContentChange}/>
      </FormItem>
      {
        type == 2 ? (<OperationBlock wordList={translatedContentList}
                                     handleWordItem={switchTranslatedFillItemStatus}></OperationBlock>) : ('')
      }

      {
        type == 4 ? (<FormItem className={styles.halfRow}>
            <h4 >上传图片</h4>
            <Upload {...imageProps}>
              {poster && poster.eimg ? <img src={poster.eimg} alt="" className="avatar"/> :
                <Icon type="plus" className="avatar-uploader-trigger"/>}
            </Upload>
          </FormItem>) : ('')
      }

      <FormItem className={styles.halfRow}>
        <h4 >上传音频</h4>
        <Upload {...props}>
          {audioUrl ? (<audio controls="controls" src={audioUrl}></audio>) :
            (<Button><Icon type="upload"/> 点击上传</Button>)}
        </Upload>
      </FormItem>

      {
        type == 5 && sentenceType == "optionSentence" ? (<FormItem className={styles.row}>
            <Button type={isAnswer ? 'primary' : 'default'}
                    onClick={handleAnswerChange.bind(this, index)}>设置为正确选项</Button>
          </FormItem>) : ('')
      }

    </div>
  )
};

export default Sentence;



