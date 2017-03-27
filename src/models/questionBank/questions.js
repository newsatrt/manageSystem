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
    list: [
      {
        "id": "\"58d20f6b0fbc9c9ed2771747\"",
        "type": 2,
        "level_ids": [
          "10002"
        ],
        "system_user_id": "1",
        "status": 0,
        name: "这是第一个题目",
        "items": [
          {
            "id": "\"58d20f6b0fbc9c9ed2771746\"",
            "label": "",
            "content": "Where are you from?",
            "blank": [
              0,
              1,
              2,
              3,
              4
            ],
            "translated_content": "你来自哪里？",
            "translated_blank": [
              3,
              4
            ],
            "audio_url": "http:/www.baidu.com",
            "role": "",
            "role_name": "",
            "multi": false,
            "poster": {
              "eimg": "http://www.baidu.com",
              "pimg": "",
              "himg": "",
              "vimg": ""
            },
            "choices": [],
            "options": []
          }
        ]
      },
      {
        "id": "\"58d20b9d0fbc9c9d10e52575\"",
        "type": 1,
        "level_ids": [
          "10001"
        ],
        "system_user_id": "1",
        "status": 0,
        name: "这是第二个题目",
        "items": [
          {
            "id": "\"58d20b9d0fbc9c9d10e52573\"",
            "label": "",
            "content": "Hello world",
            "blank": [],
            "translated_content": "世界你好",
            "translated_blank": [],
            "audio_url": "http:/www.baidu.com",
            "role": "",
            "role_name": "",
            "multi": false,
            "poster": {
              "eimg": "",
              "pimg": "",
              "himg": "",
              "vimg": ""
            },
            "choices": [],
            "options": []
          },
          {
            "id": "\"58d20b9d0fbc9c9d10e52574\"",
            "label": "",
            "content": "Hello are you?",
            "blank": [],
            "translated_content": "你好吗？",
            "translated_blank": [],
            "audio_url": "http:/www.baidu.com",
            "role": "",
            "role_name": "",
            "multi": false,
            "poster": {
              "eimg": "",
              "pimg": "",
              "himg": "",
              "vimg": ""
            },
            "choices": [],
            "options": []
          }
        ]
      }
    ],
    total: 2,
    page: 1,
    type: 1,
    question: {
      type: 1,
      name: '',
      tag: [],
      roleList: [],
      items: [{
        label: 1,
        content: "",
        blank: [],
        translated_content: "",
        translated_blank: [],
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
    },
    questionInit: [
      {
        type: 1,
        name: '',
        tag: [],
        items: [{
          label: 1,
          content: "",
          translated_content: "",
          audio_url: "",
        }]
      }, {
        type: 2,
        name: '',
        tag: [],
        items: [{
          label: 1,
          content: "",
          blank: [],
          translated_content: "",
          translated_blank: [],
          audio_url: "",
        }]
      }, {
        type: 4,
        name: '',
        tag: [],
        roleList: [{key: 1, value: ''}],
        items: [{
          label: 1,
          content: "",
          translated_content: "",
          audio_url: "",
          poster: {
            eimg: ""
          },
          role: "",
          role_name: "",
        }]
      }, {
        type: 5,
        name: '',
        tag: [],
        items: [{
          label: 1,
          content: "",
          translated_content: "",
          audio_url: "",
          choices: [
            {
              label: "",
              content: "",
              translated_content: "",
              audio_url: "",
              options: [
                {
                  label: "A",
                  content: "",
                  translated_content: "",
                  audio_url: "",
                  is_answer: false
                }
              ]
            }
          ]
        }]
      }
    ]
  },
  reducers: {
    handlePageType(state, action = {payload: {pageType: 'add'}}){
      console.log("~~~~~~~~~~~~~~ handlePageType ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",state);
      return {
        ...state,
        ...action.payload
      }
    },

    handleQuestionType(state, action = {payload: {type: 1}}){
      return {
        ...state,
        ...action.payload
      }
    },

    handleChangeConversationsSentence(state, action){
      console.log('handleConversationsSentence~~~~~~~~~~', action);
      return {
        ...state,
        question: {...action.payload}
      }
    },

    handleRoleListChange(state, action){
      console.log('handleRoleListChange~~~~~~~~~~', action);
      return {
        ...state,
        question: {...action.payload}
      }
    },

    handleQuestionInfoChange(state, action){
      return {
        ...state,
        question: action.payload
      }
    },
  },
  effects: {
    *patchQuestionList({payload: {page = 1, pageSize = 20, type = 1}}, {call, put}) {
      console.log('patchQuestionList-------------------------');
      console.log(page, pageSize, type);
      const {data, headers} = yield call(questionsService.patchQuestionList, {page, pageSize, type});

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
    *switchQuestionType ({
      payload
    }, {put}) {
      yield put({
        type: 'handleQuestionType',
        payload
      })
    },
    *changeSentence({payload}, {put}){
      console.log('changeSentence model~~~~~~~~~~~~~~~~~~~~~~~', payload);
      yield put({
        type: 'handleChangeConversationsSentence',
        payload
      })
      console.log('changeSentence~~~~~~~~~~~~~~~~~~~~~~~ end');
    },

    *changeRoleList({payload}, {put}){
      console.log('changeRoleList model~~~~~~~~~~~~~~~~~~~~~~~', payload);
      yield put({
        type: 'handleRoleListChange',
        payload
      })
      console.log('changeRoleList~~~~~~~~~~~~~~~~~~~~~~~ end');
    },

    *changeQuestionInfo({payload}, {put}){
      console.log('changeQuestionInfo model~~~~~~~~~~~~~~~~~~~~~~~', payload);
      yield put({
        type: 'handleQuestionInfoChange',
        payload
      })
      console.log('changeQuestionInfo~~~~~~~~~~~~~~~~~~~~~~~ end');
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        console.log('subscriptions start');
        if (pathname === '/question-bank/question/') {
          query.type = parseInt(query.type);
          dispatch({type: 'switchQuestionType', payload: query});
          dispatch({type: 'patchQuestionList', payload: query});
        } else if (pathname === '/question-bank/edit/') {
          dispatch({type: 'switchPageType', payload: query});
        }
        console.log('subscriptions end');
      });
    },
  },
};
