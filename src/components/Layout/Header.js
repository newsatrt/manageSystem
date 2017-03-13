import React, {PropTypes} from 'react'
import {Menu, Icon, Popover} from 'antd'
import styles from './main.css'

const SubMenu = Menu.SubMenu

function Header({user, logout, switchSider, collapsed, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys}) {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    collapsed: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  return (
    <div className={styles.header}>
      <div className={styles.siderbutton} onClick={switchSider}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
      </div>

      <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
        <SubMenu className={styles['header-sub-menu']} title={< span > <Icon type='user'/>
          {user.name} </span>}>
          <Menu.Item key='logout'>
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  collapsed: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
}

export default Header
