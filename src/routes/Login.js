import React, {PropTypes} from 'react'
import {Button, Row, Form, Input} from 'antd'
import {connect} from 'dva'
import styles from './Login.css'
import logoText from '../assets/icon/100.png'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {

  function onOk (data) {
    dispatch({type: 'app/login', payload: data})
  }

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.logoBox}>
          <img src={logoText}></img>
          <div >CLASS</div>
        </div>

      </div>
      <div className={styles.right}>
        <div className={styles.loginBox}>
          <h1>LOGIN</h1>
          <span className={styles.description}>Login with your account</span>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名'
                  }
                ]
              })(<Input size='large' onPressEnter={handleOk} placeholder='User Name'/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ]
              })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='Password'/>)}
            </FormItem>
            <Row>
              <Button type='default' size='large' loading={loginButtonLoading}>
                Login
              </Button>
            </Row>
          </form>
        </div>
      </div>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
}

export default connect(({login}) => ({login}))(Form.create()(login));
