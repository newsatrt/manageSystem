import React, { PropTypes } from 'react'
import { Layout} from 'antd';
const {Sider } = Layout;
import Menus from './Menus'


function SiderComponent ({ collapsed, location, navOpenKeys, changeOpenKeys }) {
  const menusProps = {
    collapsed,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  return (
  <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
  >
    <div className="logo" />
    <Menus {...menusProps} />
  </Sider>
  )
}

SiderComponent.propTypes = {
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
}

export default SiderComponent
