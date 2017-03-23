/**
 * Created by YXH on 2017/3/23 0023.
 */
import React from 'react';
import Sentence from './Sentence';

const ChoiceQuestion = ({choice = {}, type = 4}) => {
  const questionTitleProps = {
    type: type,
      ...choice
  };

  let options = choice.options;

  return (
    <div>
      <div>
        <h4>题目</h4>
        <Sentence {...questionTitleProps}></Sentence>
      </div>

      <div>
        <h4>选项</h4>
        {
          options && options.map(function (option, index) {
            const optionProps = {
              type: type
            }
            <Sentence {...optionProps} key={index}></Sentence>
          })
        }

        <Button type="dashed" onClick={add} style={{width: '60%'}}>
          <Icon type="plus"/> 添加选项
        </Button>
      </div>
    </div>
  )
}

export default ChoiceQuestion;
