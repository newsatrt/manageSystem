import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    /*
    * dva 里，effects 和 subscriptions 的抛错全部会走 onError hook,
    * 所以可以在 onError 里统一处理错误。
    * 然后 effects 里的抛错和 reject 的 promise 就都会被捕获到了
    * */
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'))
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
