import { FC } from "react"
import { ILoginProps } from "@/container/Login/interface.ts"
import { useTitle } from "ahooks"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import AccountLogin from "@/container/Login/c-cpns/AccountLogin"
import MsgCodeLogin from "@/container/Login/c-cpns/MsgCodeLogin"

const Login: FC<ILoginProps> = () => {
  useTitle("登录")

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ModeToggle />
      <Tabs className="w-[400px]" defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="msg">Msg-code</TabsTrigger>
        </TabsList>
        <AccountLogin />
        <MsgCodeLogin />
      </Tabs>
    </div>
  )
}

export default Login
