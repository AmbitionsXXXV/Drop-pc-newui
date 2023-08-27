import ReactDOM from "react-dom/client"
import "./index.css"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/lib/apollo.ts"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ROUTE_CONFIG } from "@/router"
import { ThemeProvider } from "@/components/theme-provider"
import UserInfo from "@/components/UserInfo"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* 获取用户信息 */}
      <UserInfo>
        <BrowserRouter>
          <Routes>
            {ROUTE_CONFIG.map(item => (
              <Route path={item.path} key={item.key} element={<item.element />} />
            ))}
            {/*<Route path="*" element={<Page404 />} />*/}
          </Routes>
        </BrowserRouter>
      </UserInfo>
    </ThemeProvider>
  </ApolloProvider>
)
