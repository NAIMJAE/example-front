import { Navigate, createBrowserRouter } from "react-router-dom";
import MainPage from '../pages/MainPage';
import ListPage from '../pages/article/ListPage';
import WritePage from "../pages/article/WritePage";
import ViewPage from "../pages/article/ViewPage";
import ModifyPage from "../pages/article/ModifyPage";
import RegisterPage from "../pages/member/RegisterPage";
import UserList from "../pages/member/UserList";
import LoginPage from "../pages/member/LoginPage";
import GuidePage from "../pages/GuidePage";

const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },
    { path: '/guide', element: <GuidePage /> },

    // article
    { path: '/list', element: <ListPage /> },
    { path: '/write', element: <WritePage /> },
    { path: '/view', element: <ViewPage /> },
    { path: '/modify', element: <ModifyPage /> },

    // member
    { path: '/userList', element: <UserList /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: "/user/logout", element: <Navigate replace to="/"/> },

]);
export default root;