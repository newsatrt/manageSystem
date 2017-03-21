import React, {Component} from 'react'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Question extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="题型"
        >
          {getFieldDecorator('questionType', {
            initialValue: '1',
            rules: [
              {required: true, message: '请选择题型!'},
            ],
          })(
            <Select placeholder="请选择题型">
              <Option value="1">听说</Option>
              <Option value="2">填空</Option>
              <Option value="3">对话</Option>
              <Option value="4">选择</Option>
              <Option value="5">阅读</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="标签"
        >
          {getFieldDecorator('questionTag', {
            rules: [
              {type: 'array'},
            ],
          })(
            <Select multiple placeholder="选择标签">
              <OptGroup label="年级">
                <Option value="gradeOne">一年级</Option>
                <Option value="gradeTwo">二年级</Option>
                <Option value="gradeThree">三年级</Option>
                <Option value="gradeFour">四年级</Option>
                <Option value="gradeFive">五年级</Option>
                <Option value="gradeSix">六年级</Option>
                <Option value="gradeSeven">七年级</Option>
                <Option value="gradeEight">八年级</Option>
                <Option value="gradeNine">九年级</Option>
                <Option value="gradeTen">十年级</Option>
                <Option value="gradeElven">十一年级</Option>
                <Option value="gradeTwelve">十二年级</Option>
              </OptGroup>
              <OptGroup label="学期">
                <Option value="firstTerm">上学期</Option>
                <Option value="lastTerm">下学期</Option>
              </OptGroup>
              <OptGroup label="教材">
                <Option value="renjiaoban">人教版</Option>
                <Option value="langwen">朗文</Option>
              </OptGroup>
            </Select>
          )}
        </FormItem>

        <FormItem>

        </FormItem>

        <FormItem
          wrapperCol={{span: 12, offset: 6}}
        >
          <Button type="primary" htmlType="submit">保存</Button>
          <Button>返回</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Question);

