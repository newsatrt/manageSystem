import React from 'react'
import styles from './OperationBlock.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles);

const OperationBlock = ({wordList}) => {
  const {operationType} = this.state;
  const handleWordItem = (index) => {
    wordList[index].status = !wordList[index].status;
  };

  return (
    <div>
      <div className={styles.wordEditBlock}>
        {
          wordList.map(function (word, index) {
            let wordItemClasses = cx({
              'wordItem': true,
              'fillActive': operationType === 'fill' && word.status
            });

            return word.value ? <span key={index} className={wordItemClasses}
                                      onClick={handleWordItem.bind(this, index)}>{word.value}</span> : ''
          }, this)
        }
      </div>

      <div className={styles.wordShowBlock}>

      </div>

    </div>
  )
}
export default OperationBlock
