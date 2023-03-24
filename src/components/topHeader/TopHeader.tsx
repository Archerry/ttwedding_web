import { Header } from "antd/es/layout/layout";
import { Dropdown, Space, theme, Avatar } from "antd";
import type { MenuProps } from 'antd';
import {
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from 'react';

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeCollapsed = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          超级管理员
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: "退出",
    },
  ];

  return (
    <Header style={{ padding: "0 16px", background: colorBgContainer }}>
      {collapsed ? (
        <MenuUnfoldOutlined
          onClick={() => {
            changeCollapsed();
          }}
        />
      ) : (
        <MenuFoldOutlined
          onClick={() => {
            changeCollapsed();
          }}
        />
      )}
      <div style={{ float: "right" }}>
        <span>欢迎Archer回来</span>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={40} style={{ marginLeft: 10 }}>
                Archer
              </Avatar>
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default TopHeader;
