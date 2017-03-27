import React from 'react';
import './Sentence.css';
import OperationBlock from './OperationBlock';
import {Input, Select, Button, Icon, Upload, message, Form} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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
      wordList: [],
      translatedContentList: [],
      roleList: props.roleList ? props.roleList : [],
    };
  }


  handleContentChange = (event) => {
    if(this.props.type == 2){
      const tempWordList = event.target.value.split(' ');
      let wordList = [];
      for (let i = 0, len = tempWordList.length; i < len; i++) {
        wordList.push({
          value: tempWordList[i],
          isActive: false
        })
      }

      this.props.handleSentenceInfoChange(this.props.index,this.props.type,{content: event.target.value, wordList: wordList});
      /*this.setState({content: event.target.value, wordList: wordList});*/
    }else {
      this.props.handleSentenceInfoChange(this.props.index,this.props.type,{content: event.target.value});
    }
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
    const {wordList, translatedContentList, translatedContent, imageUrl, roleList} = this.state
    const formItemLayout = {
      labelCol: {span: 2,offset: 4},
      wrapperCol: {span: 14},
    };

    const formItemLayoutOperation = {
      wrapperCol: {span: 16,offset: 4},
    };

    return (
      <div>
        <FormItem {...formItemLayout}
                  label="英文">
          <Input placeholder="请输入英文" onChange={this.handleContentChange.bind(this) } value={props.content}/>
        </FormItem>

        <FormItem {...formItemLayoutOperation}>
          {
            this.props.type == 2 ? (
                <OperationBlock wordList={wordList} handleWordItem={this.handleWordItem}></OperationBlock>) : ('')

          }
        </FormItem>

        <FormItem {...formItemLayout}
                  label="中文">
          <Input placeholder="请输入中文" value={translatedContent} onChange={this.handleTranslatedContentChange}/>
        </FormItem>

        <FormItem {...formItemLayoutOperation}>
          {
            this.props.type == 2 ? (<OperationBlock wordList={translatedContentList}
                                                    handleWordItem={this.handleTranslatedContentItemFill}></OperationBlock>) : ('')
          }
        </FormItem>

        <div>
          <h4 >上传图片</h4>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="http://192.168.102.107:14500/Oper/upload_file"
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

        {
          this.props.type == 4 && roleList.length > 0 ? (
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
    )
  }
}



