/**
 * Created by YXH on 2017/3/23 0023.
 */
import React from 'react';
import {Button, Icon, Input} from 'antd';
import Sentence from './SentenceEdit';
import styles from './ChoiceQuestion.css';

const ChoiceQuestion = ({choice, type, addOptions, deleteOptions, index:choiceIndex, handleChoicesContentInfoChange, handleChoicesOptionsInfoChange}) => {
  const questionTitleProps = {
    type: type,
    handleSentenceInfoChange: handleChoicesContentInfoChange,
    index:choiceIndex,
    ...choice
  };

  const letterList = ['A','B','C','D','E','F','G','F','I','J','K','L','M','N'];
  let options = choice.options;

  return (
    <div className={styles.wrapper}>
      <div>
        <h4 className={styles.title}>题目{choiceIndex+1}</h4>
        <Sentence {...questionTitleProps}></Sentence>
      </div>

      <div>
        <h4 className={styles.title}>选项</h4>
        <div className={styles.options}>
          {
            options && options.map(function (option, optionIndex) {
              const optionProps = {
                type: type,
                index: optionIndex,
                choiceIndex: choiceIndex,
                sentenceType: 'optionSentence',
                handleSentenceInfoChange: handleChoicesOptionsInfoChange,
                ...option
              };
              return (
                <div style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '5px'}}
                     key={optionIndex}>
                  <span className={styles.mark}>{letterList[optionIndex]}</span>
                  <Sentence {...optionProps} key={choiceIndex} style={{width: '100%', flex: 1}}></Sentence>
                  <Icon type="minus-circle-o" onClick={deleteOptions.bind(null, choiceIndex, optionIndex)}
                        style={{fontSize: '17px', marginLeft: '10px'}}/>
                </div>

              );
            })
          }

          <Button type="dashed" onClick={addOptions.bind(null, choiceIndex)}
                  style={{width: '60%', margin: '0 auto', display: 'block'}}>
            <Icon type="plus"/> 添加选项
          </Button>
        </div>
      </div>
    </div>
  )
};

export default ChoiceQuestion;
