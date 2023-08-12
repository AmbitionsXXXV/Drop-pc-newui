import Login from "@/container/Login"
import Home from "@/container/Home"

export const ROUTE_CONFIG = [
  {
    key: "home",
    path: "/",
    element: Home,
    title: "首页"
  },
  {
    key: "login",
    path: "/login",
    element: Login,
    title: "登录"
  }
]
