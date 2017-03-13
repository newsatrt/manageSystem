import React, {PropTypes} from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'dva/router'
import {menu} from '../../utils'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, collapsed, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ?
          <Icon type={item.icon}/> : ''}{collapsed && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, collapsed, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon}/> : ''}
            {collapsed && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus({collapsed, location, isNavbar, handleClickNavMenu, navOpenKeys, changeOpenKeys}) {
  const menuItems = getMenus(menu, collapsed)

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  // 菜单栏收起时，不能操作openKeys
  let menuProps = !collapsed ? {
      onOpenChange,
      openKeys: navOpenKeys
    } : {}

  return (
    <Menu
      {...menuProps}
      mode={collapsed ? 'vertical' : 'inline'}
      theme='dark'
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'users']}>
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  collapsed: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
}

export default Menus
