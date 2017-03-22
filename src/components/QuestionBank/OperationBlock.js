import React from 'react'
import styles from './OperationBlock.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles);

const OperationBlock = ({wordList,handleWordItem}) => {
  return (
    <div className={styles.operationBlock}>
      <h5 className={styles.title}>设置填空</h5>
      <div className={styles.wordEditBlock}>
        {
          wordList.map(function (word, index) {
            let wordItemClasses = cx({
              'wordItem': true,
              'fillActive': word.isActive
            });

            return word.value ? <span key={index} className={wordItemClasses}
                                      onClick={handleWordItem.bind(this,index)}>{word.value}</span> : ''
          }, this)
        }
      </div>

      <div className={styles.wordShowBlock}>
        {
          wordList.map(function (word, index) {
            let wordItemClasses = cx({
              'wordItemShow': true,
              'fillActiveShow': word.isActive
            });

            return word.value ? <span key={index} className={wordItemClasses}>{word.value}</span> : ''
          }, this)
        }
      </div>

    </div>
  )
}
export default OperationBlock
