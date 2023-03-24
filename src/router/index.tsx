import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SandBox from "../pages/sandbox/SandBox";
import NotFound from "../pages/notFound/NotFound";
import AuthComponent from "../components/AuthComponent";
import Home from "../pages/home/Home";
import Index from "../pages/categoryManage";

function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthComponent>
              <SandBox />
            </AuthComponent>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="category-manage/mainYarnList" element={<Index />}>
            <Route path=":categoryId" element={<Index />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

function isAuth() {
  return localStorage.getItem('Authorization');
}

export default IndexRouter;
