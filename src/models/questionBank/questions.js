/**
 *  题目例子
 * question: {
      type: 1, // 题型
      name: '', //题目名称，方便运维人员定位题目
      tag: ['八年级上学期','人教版'], // 标签
      status: 2, // 题目状态，启用还是废弃用
      items: [{  // 子句
        label: "1", //序号
        content: "Hello world",
        content_fill_index:[1,2,3,6,7,9], //英文填空下标
        translated_content: "世界你好~",
        translated_content_fill_index:[1,2,3],//中文填空下标
        audio_url: "http://www.baidu.com",
        poster: {
          eimg: "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        },
        role: "A",
        role_name: "小杨",
        choices: [ //选择题型，音频+一道或多道选择题
          {
            label: "1", //序号
            content: "Hello world",
            translated_content: "世界你好~",
            audio_url: "http://www.baidu.com",
            options: [
              {
                label: "A",
                text: "select ABC",
                audio_url: "http://www.qikqiak.com"
              }
            ]
          }
        ]
      }]
    }
 * */
import * as questionsService from '../../services/questions';

export default {
  namespace: 'questions',
  state: {
    pageType: 'add',
    list: [],
    total: null,
    page: null,
    type: 1,
    question: {
      type: 1,
      name: '',
      tag: [],
      items: [{
        label: 1,
        content: "",
        content_fill_index:[],
        translated_content: "",
        translated_content_fill_index:[],
        audio_url: "",
        poster: {
          eimg: ""
        },
        role: "",
        role_name: "",
        choices: [
          {
            label: "",
            content: "",
            translated_content: "",
            audio_url: "",
            options: [
              {
                label: "",
                text: "",
                audio_url: ""
              }
            ]
          }
        ]
      }]
    }

  },
  reducers: {
    handlePageType(state,action={payload:{pageType: 'add'}}){
      return {
        ...state,
        ...action.payload
      }
    },

    handleConversationsSentence(state,action){
      return {
        ...state.question,
        ...action.payload
      }
    },
  },
  effects: {
    *patchQuestionList({ payload: { page = 1,pageSize=20,type=1 }}, { call, put }) {
      const { data, headers } = yield call(questionsService.patchQuestionList, { page,pageSize,type});
      console.log('patchQuestionList-------------------------');
      console.log(data);
      /*yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });*/
    },
    *switchPageType ({
      payload
    }, {put}) {
      yield put({
        type: 'handlePageType',
        payload
      })
    },
    *addSentence({payload},{put}){
      console.log('addSentence~~~~~~~~~~~~~~~~~~~~~~~',payload)
      yield put({
        type: 'handleConversationsSentence',
        payload
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log('subscriptions start');
        if (pathname === '/question-bank/question/') {
         dispatch({ type: 'patchQuestionList', payload: query });
        }else if(pathname === '/question-bank/edit/'){
          dispatch({ type: 'switchPageType', payload: query });
        }
        console.log('subscriptions end');
      });
    },
  },
};
