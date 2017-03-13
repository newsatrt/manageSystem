import React, {PropTypes} from 'react'
import {Spin, Layout} from 'antd'
import {connect} from 'dva'
const {Sider} = Layout;
import Menus from '../components/Layout/Menus'
import Header from '../components/Layout/Header'
import Bread from '../components/Layout/Bread'
import Footer from '../components/Layout/Footer'
import {classnames} from '../utils'
import styles from './App.css';


function App({children, location, dispatch, app}) {
  const {login, loading, loginButtonLoading, user, collapsed, isNavbar, menuPopoverVisible, navOpenKeys} = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }

  const headerProps = {
    user,
    collapsed,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
    }
  }

  const menusProps = {
    collapsed,
    location,
    navOpenKeys,
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
    }
  }

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo"/>
        <Menus {...menusProps} />
      </Sider>

      <Layout className={styles.main}>
        <Header {...headerProps}/>
        {/* <Bread location={location}/>*/}
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer />
      </Layout>
    </Layout>


    /*<div
     className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : collapsed}, {[styles.withnavbar]: isNavbar})}>
     {!isNavbar ? <aside>
     <SiderComponent {...siderProps} />
     </aside> : ''}
     <div className={styles.main}>
     {/!* <Header {...headerProps} />
     <Bread location={location}/>*!/}
     <div className={styles.container}>
     <div className={styles.content}>
     {children}
     </div>
     </div>
     {/!* <Footer />*!/}
     </div>
     </div>
     : <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading}
     size='large'><Login {...loginProps} /></Spin></div>}</div>*/
  )
}

App.propTypes = {
  /*  children: PropTypes.element.isRequired,
   location: PropTypes.object,
   dispatch: PropTypes.func,
   app: PropTypes.object*/
}

export default connect(({app}) => ({app}))(App);
