/**
 * Created by YXH on 2017/3/23 0023.
 */
import React from 'react';
import Sentence from './Sentence';

const ConversationsQuestion = ({items=[],type=1}) => {
  return (
    <div>
      {
        items.map(function(item,index){
          const itemProps = {
            type: type,
            ...item
          }
          <Sentence {...itemProps} key={index}></Sentence>
        })
      }
    </div>
  )
}

export default ConversationsQuestion;
