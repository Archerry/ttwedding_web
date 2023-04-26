import React from "react";
import { theme } from "antd";

const Home: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <div>Homeaaaaa</div>;
};

export default Home;
