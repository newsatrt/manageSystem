import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Sentence.css'
import {Input, Select, Button, Icon, Upload, message} from 'antd'
const Dragger = Upload.Dragger
import classNames from 'classnames/bind'
const Option = Select.Option

let cx = classNames.bind(styles);

const selectBefore = (
  <Select defaultValue="1" style={{width: 80}}>
    <Option value="1">角色A</Option>
    <Option value="2">角色B</Option>
    <Option value="3">角色C</Option>
    <Option value="4">角色D</Option>
    <Option value="0">无角色</Option>
  </Select>
);

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
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentenceType: 0,
      collapsed: true,
      wordList: [],
      operationType: 'fill',
      englishValue: '',
      clearVisible: false,
      selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : ''
    };

    this.handleFoldSentenceInformation = this.handleFoldSentenceInformation.bind(this);
    this.handleEnglishInputChange = this.handleEnglishInputChange.bind(this);
    this.handleWordItem = this.handleWordItem.bind(this);
  }

  handleSearch = () => {
    const data = {
      keyword: ReactDOM.findDOMNode(this.refs.searchInput).value
    }
    if (this.props.select) {
      data.field = this.state.selectValue
    }
    this.props.onSearch && this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== ''
    })
  }
  handeleSelectChange = value => {
    this.setState({
      ...this.state,
      selectValue: value
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this.setState({
      clearVisible: false
    })
    this.handleSearch()
  }

  handleFoldSentenceInformation = () => {
    this.setState({
      ...this.state,
      collapsed: !this.state.collapsed
    })
  }

  handleWordItem = (index) => {
    console.log(index);
    switch (this.state.operationType) {
      case 'fill':
        this.handleSentenceCompletion(index)
        break;
      default:
        this.handleSentenceCompletion(index)
        break;
    }
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
    console.log(this.state.englishValue);
  }

  handleSentenceCompletion = (index) => {
    var wordList = this.state.wordList;
    wordList[index].status = !wordList[index].status;
    this.setState({wordList: wordList});
  }

  handleTranslatedContentChange(event) {
    this.setState({translatedContent: event.target.value});
  }

  render() {
    const {size, select, selectOptions, selectProps, style, keyword} = this.props
    const {collapsed, englishValue, wordList, operationType, clearVisible} = this.state

    return (
      <div>
        <Input placeholder="请输入英文" addonBefore={selectBefore} onChange={this.handleEnglishInputChange}
               addonAfter={<Icon type={collapsed ? "up-circle-o" : "down-circle-o"}
                                 onClick={this.handleFoldSentenceInformation}/>}
               defaultValue="1" value={englishValue}/>
        {collapsed ? (<div></div>) : (<div>
            <div>
              <h4 className={styles.title}>英文操作区</h4>

              <div className={styles.wordEditBlock}>
                {
                  this.state.wordList.map(function (word, index) {
                    let wordItemClasses = cx({
                      'wordItem': true,
                      'fillActive': operationType === 'fill' && word.status
                    });

                    return word.value ? <span key={index} className={wordItemClasses}
                                              onClick={this.handleWordItem.bind(this, index)}>{word.value}</span> : ''
                  }, this)
                }
              </div>

              <div className={styles.wordShowBlock}>

              </div>

            </div>

            <div>
              <h4 className={styles.title}>中文操作区</h4>

              <Input
                placeholder="请输入中文"
                value={translatedContent}
                onChange={this.handleTranslatedContentChange}
              />

              <div className={styles.wordEditBlock}>
                {
                  this.state.wordList.map(function (word, index) {
                    let wordItemClasses = cx({
                      'wordItem': true,
                      'fillActive': operationType === 'fill' && word.status
                    });

                    return word.value ? <span key={index} className={wordItemClasses}
                                              onClick={this.handleWordItem.bind(this, index)}>{word.value}</span> : ''
                  }, this)
                }
              </div>

              <div className={styles.wordShowBlock}>

              </div>


            </div>

            <div>
              <h4 className={styles.title}>添加图片</h4>

              <div style={{marginTop: 16, height: 180}}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                  </p>
                  <p className="ant-upload-text">点击或将图片拖拽到此处来上传</p>
                </Dragger>
              </div>
            </div>

            <div>
              <h4 className={styles.title}>添加音频</h4>


            </div>

          </div>)}

        <Input.Group compact size={size} className={styles.search} style={style}>
          {select && <Select ref='searchSelect' onChange={this.handeleSelectChange} size={size} {...selectProps}>
            {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value}
                                                                              key={key}>{item.name || item.value}</Select.Option>)}
          </Select>}
          <Input ref='searchInput' size={size} onChange={this.handleInputChange} onPressEnter={this.handleSearch}
                 defaultValue={keyword}/>
          <Button size={size} type='primary' onClick={this.handleSearch}>搜索</Button>
          {clearVisible && <Icon type='cross' onClick={this.handleClearInput}/>}
        </Input.Group>
      </div>
    )
  }
}

export default Sentence
