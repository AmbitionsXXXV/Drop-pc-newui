import { FieldValues, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { LOGIN } from "@/graphql/auth.ts"
import { SUCCESS } from "@/constants/code.ts"
import { AUTH_TOKEN } from "@/constants"

export const useOnSubmit = <T extends FieldValues>(form: any): SubmitHandler<T> => {
  const [login] = useMutation(LOGIN)

  return async data => {
    await form.trigger()

    // 登录逻辑处理
    const response = await login({
      variables: data
    })
    if (response.data.login.code === SUCCESS) {
      // 存储 token
      localStorage.setItem(AUTH_TOKEN, response.data.login.data)

      toast.success("登录成功", {
        style: {
          color: "var(--foreground)",
          background: "--background",
          borderColor: "var(--border)"
        }
      })
    } else {
      toast.error(response.data.login.message, {
        style: {
          color: "var(--foreground)",
          background: "var(--background)",
          borderColor: "var(--border)"
        }
      })
    }
  }
}
