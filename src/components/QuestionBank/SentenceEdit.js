import React from 'react'
import './Sentence.css'
import OperationBlock from './OperationBlock'
import {Input, Select, Button, Icon, Upload, message} from 'antd'
const Option = Select.Option

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

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


export default class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentenceType: 0,
      collapsed: true,
      wordList: [],
      translatedContentList: [],
      questionType: 3, /* 0- 1- 2- 3- 4- */
      englishValue: '',
      roleList: props.roleList ? props.roleList : [],
    };

    this.handleEnglishInputChange = this.handleEnglishInputChange.bind(this);
    this.handleWordItem = this.handleWordItem.bind(this);
    this.handleTranslatedContentChange = this.handleTranslatedContentChange.bind(this);
  }


  handleEnglishInputChange = (event) => {
    const tempWordList = event.target.value.split(' ');
    let wordList = [];
    for (let i = 0, len = tempWordList.length; i < len; i++) {
      wordList.push({
        value: tempWordList[i],
        isActive: false
      })
    }

    this.setState({englishValue: event.target.value, wordList: wordList});
  }

  handleWordItem = (index) => {
    let wordList = this.state.wordList;
    wordList[index].isActive = !wordList[index].isActive;
    this.setState({wordList: wordList});
  };

  handleTranslatedContentChange = (event) => {
    const value = event.target.value != null ? event.target.value : '';
    const tempWordList = Array.from(value.trim());
    console.log(tempWordList);
    let translatedContentList = [];
    for (let i = 0, len = tempWordList.length; i < len; i++) {
      translatedContentList.push({
        value: tempWordList[i],
        isActive: false
      })
    }

    this.setState({translatedContent: event.target.value, translatedContentList: translatedContentList});
  }

  handleTranslatedContentItemFill = (index) => {
    let translatedContentList = this.state.translatedContentList;
    translatedContentList[index].isActive = !translatedContentList[index].isActive;
    this.setState({translatedContentList: translatedContentList});
  };

  state = {};

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}));
    }
  }

  render() {
    const {englishValue, wordList, translatedContentList, translatedContent, imageUrl, questionType, roleList} = this.state

    return (
      <div>

        <div>

          <Input placeholder="请输入英文" onChange={this.handleEnglishInputChange} value={englishValue}/>

          <OperationBlock wordList={wordList} handleWordItem={this.handleWordItem}></OperationBlock>

          <Input placeholder="请输入中文" value={translatedContent} onChange={this.handleTranslatedContentChange}/>

          <OperationBlock wordList={translatedContentList}
                          handleWordItem={this.handleTranslatedContentItemFill}></OperationBlock>

          <div>
            <h4 >上传图片</h4>

            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              action="http://192.168.102.107:14500/Oper/upload_file"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl ?
                  <img src={imageUrl} alt="" className="avatar"/> :
                  <Icon type="plus" className="avatar-uploader-trigger"/>
              }
            </Upload>
          </div>

          <div>
            <h4 >上传音频</h4>
            <Upload {...props}>
              <Button>
                <Icon type="upload"/> 点击上传
              </Button>
            </Upload>
          </div>
          {/*
           * 对话题型并且设置了角色时显示
           * */}
          {
            questionType == 3 && roleList.length > 0 ? (
                <Select defaultValue="A" style={{width: 80}}>
                  {
                    roleList.map(function (role, index) {
                      return (<Option value={role.key} key={index}>{role.value}</Option>)
                    })
                  }
                </Select>
              ) : ('')
          }


        </div>
      </div>
    )
  }
}



