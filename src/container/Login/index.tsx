import { FC } from "react"
import { ILoginProps } from "@/container/Login/interface.ts"
import { useTitle } from "ahooks"

const Login: FC<ILoginProps> = () => {
  useTitle("登录")

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username below to longin your account
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
