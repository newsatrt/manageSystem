import React from 'react';
import {Router} from 'dva/router';
import App from './routes/App'

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Home'));
        });
      },
      childRoutes: [
        {
          path: 'home',
          name: 'HomePage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/home'));
              cb(null, require('./routes/Home'));
            }, 'HomePage');
          },
        },

        {
          path: 'question-bank',
          getIndexRoute (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/questionBank/QuestionLevelList'));
            });
          },
          childRoutes: [
            {
              path: 'question-level-list',
              name: 'questionLevelListPage',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/questionBank/QuestionLevelList'));
                }, 'questionLevelListPage');
              },
            }, {
              path: 'question',
              name: 'questionPage',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/questionBank/questions'));
                  cb(null, require('./routes/questionBank/Question'));
                }, 'questionPage');
              }
            }, {
              path: 'edit',
              name: 'editQuestionPage',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/questionBank/questions'));
                  cb(null, require('./routes/questionBank/QuestionEdit'));
                }, 'editQuestionPage');
              }
            }
          ]
        },

        {
          path: 'users',
          name: 'UsersPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/Users'));
            }, 'UsersPage');
          },
        }
      ]

    },
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'));
          cb(null, require('./routes/Login'));
        });
      },
    },
    {
      path: '/index',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/*',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Login'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
