import { FC } from "react"
import { ILoginProps } from "@/container/Login/interface.ts"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import AccountLogin from "@/container/Login/c-cpns/AccountLogin"
import MsgCodeLogin from "@/container/Login/c-cpns/MsgCodeLogin"
import { Toaster } from "react-hot-toast"
import { useTitle } from "@/hooks/useTitle.ts"

const Login: FC<ILoginProps> = () => {
  useTitle("登录")

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ModeToggle />
      <Toaster />
      <Tabs className="w-[400px]" defaultValue="account">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border dark:border-gray-600">
          <TabsTrigger value="account" className="rounded-l-xl">
            Account
          </TabsTrigger>
          <TabsTrigger value="msg" className="rounded-r-xl">
            Msg-code
          </TabsTrigger>
        </TabsList>
        <AccountLogin />
        <MsgCodeLogin />
      </Tabs>
    </div>
  )
}

export default Login
