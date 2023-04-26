import React, {useState} from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import { Menu, MenuProps } from "antd";
import './index.less';
import { Navigate, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('首页', 'home', <SettingOutlined />),
  getItem('婚纱分类', 'category', <MailOutlined />, [
    getItem('主纱', '11'),
    getItem('轻纱', '12'),
    getItem('秀禾', '13'),
    getItem('礼服', '14'),
    getItem('伴娘服', '15'),
  ]),
  // getItem('人员管理', 'person', <AppstoreOutlined />, [
  //   getItem('员工管理', '666'),
  //   getItem('管理员管理', '777'),
  // ]),
];

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    // 根据keypath的个数判断当前菜单层级，key带的是菜单当前的key
    switch (e.keyPath.length) {
      case 1: {
        firstLevelMenuDispose(e.key);
        break;
      }
      case 2: {
        secondLevelMenuDispose(e.keyPath[e.keyPath.length - 1], e.key);
        break;
      }
    }
  };

  const firstLevelMenuDispose = (key: string) => {
    if (key === 'home') {
      navigate('/home');
    }
  };

  const secondLevelMenuDispose = (firstKey: string, key: string) => {
    console.log(firstKey, key);
    if (firstKey === 'category') {
      navigate(`/category-manage/mainYarnList/${key}`);
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">糖·婚纱后台管理系统</div>
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  );
};

export default SideMenu;
