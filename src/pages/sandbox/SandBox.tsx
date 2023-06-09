import { Link, NavLink, Outlet } from "react-router-dom";
import React from "react";
import { Layout, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import TopHeader from "../../components/topHeader/TopHeader";
import SideMenu from '../../components/sideMenu/SideMenu';
import './SandBox.less';
import { getCategories } from "./mockData";

const SandBox: React.FC = () => {
  const categories = getCategories();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Link to="/home" />
          {/*{categories.map((category) => {*/}
          {/*    return <Link*/}
          {/*        to={`/category-manage/mainYarnList/${category.categoryId}`}*/}
          {/*        key={category.categoryId}*/}
          {/*    >*/}
          {/*        {category.name}*/}
          {/*    </Link>*/}
          {/*})}*/}
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SandBox;
