import React from 'react';
import styles from './SentenceEdit.css';
import OperationBlock from './OperationBlock';
import {Input, Select, Button, Icon, Upload, message, Form} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const Sentence = ({
  content, type, index, "translated_content":translatedContent, contentWordList, translatedContentList, roleList, poster,
  handleSentenceInfoChange, choiceIndex, sentenceType, role
}) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const imageProps = {
    className: "avatar-uploader",
    name: "img",
    showUploadList: false,
    action: "http://192.168.102.107:14500/Oper/upload_file",
    onChange(info) {
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          centralizeSentenceInfoChange(index, type, {
            poster: {eimg: imageUrl}
          })
        });
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
        wordList.push({
          value: tempWordList[i],
          isActive: false
        })
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
  const switchContentFillItemStatus = (index) => {
    contentWordList[index].isActive = !contentWordList[index].isActive;
    centralizeSentenceInfoChange({contentWordList: contentWordList, blank: []});
  };
  const switchTranslatedFillItemStatus = (index) => {
    translatedContentList[index].isActive = !translatedContentList[index].isActive;
    centralizeSentenceInfoChange({translatedContentList: translatedContentList, blank: []});
  };

  return (
    <div className={styles.wrapper}>
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

      {type == 4 && roleList && roleList.length > 0 ? (
          <FormItem className={styles.row} label="角色">
            <Select value={role} style={{width: 80}}>
              {
                roleList.map(function (role, roleIndex) {
                  return (<Option value={role.key} key={roleIndex}>{role.value}</Option>)
                })
              }
            </Select>
          </FormItem>
        ) : ('')}

      {
        type == 4 ? (<FormItem className={styles.halfRow}>
            <h4 >上传图片</h4>
            <Upload {...imageProps}>
              {poster && poster.eimg ? <img src={poster.eimg} alt="" className="avatar"/> :
                <Icon type="plus" className="avatar-uploader-trigger"/>}
            </Upload>
          </FormItem>):('')
      }

      <FormItem className={styles.halfRow}>
        <h4 >上传音频</h4>
        <Upload {...props}>
          <Button>
            <Icon type="upload"/> 点击上传
          </Button>
        </Upload>
      </FormItem>

    </div>
  )
};

export default Sentence;



