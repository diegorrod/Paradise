import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon as AntdIcon } from 'antd';

const Icon = (props) => {
  return (
    <AntdIcon component={() => (<i className={`fad fa-${ props.name }`} />)} />
  )
}
const menuData = [
  {
    type: 'item',
    name: 'Dashboard',
    icon: 'home',
    key: 'dashboard'
  },
  {
    type: 'subMenu',
    name: 'Hotel',
    icon: 'concierge-bell',
    key: 'hotel/',
    childrens: [
      {
        type: 'itemGroup',
        title: 'Hotel',
        key: 'hotel',
        childrens: [
          {
            type: 'item',
            name: 'Reservas',
            icon: 'suitcase-rolling',
            key: 'hotel/reservas'
          },
          {
            type: 'item',
            name: 'Planing',
            icon: 'calendar',
            key: 'hotel/planing'
          },
          {
            type: 'item',
            name: 'Ocupación',
            icon: 'bed',
            key: 'hotel/ocupacion'
          }
        ]
      },
    ]
  },
]
const style = {
  menu: {
    item: {
      display: 'flex',
      alignItems: 'center'
    }
  }
}
const buildMenu = (value) => {
  switch(value.type) {
    case 'item': return (
      <Menu.Item style={style.menu.item} key={value.key}>
        <Icon name={value.icon} />
        <span style={{marginLeft: '12px'}}>{value.name}</span>
      </Menu.Item>
    )
    case 'subMenu': return (
      <Menu.SubMenu key={value.key} title={<span><Icon name={value.icon} /></span>}>
        {
          value.childrens.map((chValue) => {
            return buildMenu(chValue)
          })
        }
      </Menu.SubMenu>
    )
    case 'itemGroup': return (
      <Menu.ItemGroup title={value.title} key={value.key}>
        {
          value.childrens.map((chValue) => {
            return buildMenu(chValue)
          })
        }
      </Menu.ItemGroup>
    )
    default: return null;
  }
}

export const Sider = withRouter(props => {
  const handleMenuOnSelect = (value) => {
    props.history.push(`/${value.key}`)
  }
  
  return (
    <Layout.Sider theme='light' trigger={null} collapsible collapsed>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        theme="light"
        onSelect={handleMenuOnSelect}
      >
        {menuData.map((value) => {
          return buildMenu(value)
        })}
      </Menu>
    </Layout.Sider>
  )
})