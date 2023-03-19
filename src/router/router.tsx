import { createBrowserRouter } from "react-router-dom";
import GeneralLayout from "../layout/GeneralLayout";
import Home from "./Home";
import Login from "./Login";
import Sign from "./Sign";

interface RouterBase {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  withAuth: boolean; // 인증이 필요한 페이지 여부
}

const routerData: RouterBase[] = [
  {
    id: 0,
    path: "/remind",
    label: "Home",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/",
    label: "로그인",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/sign",
    label: "회원가입",
    element: <Sign />,
    withAuth: true,
  },
];

export const routers = createBrowserRouter(
  // TODO 4-1: 어드민 전용 페이지이거나 auth가 필요한 페이지는 GeneralLayout으로 감싸기
  // 어드민 전용 페이지는 isAdminPage = true를 전달
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);
