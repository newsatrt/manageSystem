/**
 * Created by YXH on 2017/3/23 0023.
 */
import React from 'react';
import Sentence from './Sentence';
import ChoiceQuestion from './ChoiceQuestion';

const ChoicesQuestion = ({items=[{}],type=4,add}) => {
  const questionDescribeProps = {
    type:type,
    ...items[0]
  };
  let choices = items[0].choices;

  return(
    <div>
      <div>
        <h4>题干</h4>
        <div>
          <Sentence {...questionDescribeProps}></Sentence>
        </div>
      </div>



      <div>
        <h4>选择题</h4>
        {
          choices && choices.map(function(choice,index){
            const choiceQuestionProps = {
              type:type,
              ...choice
            }
            return ( <ChoiceQuestion {...choiceQuestionProps} key={index}></ChoiceQuestion>);

          })
        }

        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> 添加选择题
        </Button>
      </div>
    </div>
  )
}

export default ChoicesQuestion;
