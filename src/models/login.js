import * as loginService from '../services/login';

export default {
  namespace: 'login',
  state: {
    login: false,
    loginButtonLoading: false

  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
  },
  effects: {
    *login ({
      payload:values
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(loginService.login, values)
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: values
            }
          }
        })
      } else {
        yield put({
          type: 'loginFail'
        })
      }
    },
    *logout ({
      payload:values
    }, {call, put}) {
      const data = yield call(loginService.logout, values)
      if (data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },
  },
  subscriptions: {},
};
