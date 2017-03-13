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
              cb(null, require('./routes/Home'));
            },'HomePage');
          },
        },
        {
          path: 'users',
          name: 'UsersPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/Users'));
            },'UsersPage');
          },
        }
      ]

    },
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Login'));
        });
      },
    }
  ];
 /* const routes = [
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
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      },
    },
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Login'));
        });
      },
    }/!*,
     {
     path: '/',
     component: App,
     getIndexRoute (nextState, cb) {
     require.ensure([], (require) => {
     cb(null, require('./routes/IndexPage'));
     });
     /!* require.ensure([], require => {
     registerModel(app, require('./models/dashboard'))
     cb(null, {component: require('./routes/dashboard')})
     }, 'dashboard')*!/
     require.ensure([], (require) => {
     registerModel(app, require('./models/users'));
     cb(null, require('./routes/Users'));
     },'users');
     },
     childRoutes: [
     {
     path: 'index',
     name: 'IndexPage',
     getComponent(nextState, cb) {
     require.ensure([], (require) => {
     cb(null, require('./routes/IndexPage'));
     },'IndexPage');
     },
     },
     {
     path: 'users',
     name: 'UsersPage',
     getComponent(nextState, cb) {
     require.ensure([], (require) => {
     registerModel(app, require('./models/users'));
     cb(null, require('./routes/Users'));
     },'UsersPage');
     },
     }
     ]

     }*!/
  ];*/

  return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
